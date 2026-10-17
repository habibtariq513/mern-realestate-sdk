# MernRealestate SDK exists test

import pytest
from mernrealestate_sdk import MernRealestateSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MernRealestateSDK.test(None, None)
        assert testsdk is not None
