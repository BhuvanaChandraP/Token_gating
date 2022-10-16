import smartpy as sp

class TokenGating(sp.Contract):
    def __init__(self):
        self.init(
        balances = sp.big_map(tvalue = sp.TRecord(approvals = sp.TMap(sp.TAddress, sp.TNat), balance = sp.TNat)),
        administrator = sp.address("tz1gbebf6LEaUx44KgGV3PC3P39KtsJgpYNE")
        )
 
    def is_administrator(self, sender):
        return sender == self.data.administrator

    @sp.entry_point
    def transfer(self, params):
        sp.set_type(params, sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))))
        sp.verify(self.is_administrator(sp.sender) |
            (((params.from_ == sp.sender) |
                 (self.data.balances[params.from_].approvals[sp.sender] >= params.value))), "NotAllowed")
        sp.verify(self.data.balances[params.from_].balance >= params.value, "Insufficient Balance")
        self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value)
        self.data.balances[params.to_].balance += params.value
        sp.if (params.from_ != sp.sender) & (~self.is_administrator(sp.sender)):
            self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value)
        
    @sp.entry_point
    def approve(self, params):
        sp.set_type(params, sp.TRecord(spender = sp.TAddress, value = sp.TNat).layout(("spender", "value")))
        alreadyApproved = self.data.balances[sp.sender].approvals.get(params.spender, 0)
        self.data.balances[sp.sender].approvals[params.spender] = params.value
    
    @sp.entry_point
    def mint(self, params):
        sp.set_type(params, sp.TRecord(value = sp.TNat))
        sp.verify(self.is_administrator(sp.sender), "NotAdmin")
        self.data.balances[sp.self_address].balance += params.value
    
    @sp.utils.view(sp.TNat)
    def getBalance(self, params):
        sp.if self.data.balances.contains(params):
            sp.result(self.data.balances[params].balance)
        sp.else:
            sp.result(sp.nat(0))

    @sp.utils.view(sp.TNat)
    def getAllowance(self, params):
        sp.if self.data.balances.contains(params.owner):
            sp.result(self.data.balances[params.owner].approvals.get(params.spender, 0))
        sp.else:
            sp.result(sp.nat(0))

    def get_token(self,params):
        self.transfer(sp.self_address,sp.sender,params.value)
    
    def use_token(self,params):
        self.transfer(sp.sender,sp.self_address,params.value)
    
    @sp.add_test(name="Token gating")
    def test():
        scenario = sp.test_scenario()
        c1 = TokenGating()
        scenario+=c1