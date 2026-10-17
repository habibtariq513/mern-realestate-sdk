# MernRealestate SDK utility: make_context

from projectname_sdk.core.context import MernRealestateContext


def make_context_util(ctxmap, basectx):
    return MernRealestateContext(ctxmap, basectx)
