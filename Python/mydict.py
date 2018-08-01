class Dict(dict):
    def __init__(self, **kw):
        super().__init__(**kw)

    def __getter__(self,key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError("'Dict' object has no attribute '%s'" % key)

    def __setattr__(self,key,value):
        self[key] = value