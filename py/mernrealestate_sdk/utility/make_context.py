# MernRealestate SDK utility: make_context

from mernrealestate_sdk.core.context import MernRealestateContext


def make_context_util(ctxmap, basectx):
    return MernRealestateContext(ctxmap, basectx)
