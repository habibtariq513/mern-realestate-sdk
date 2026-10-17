
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MernRealestateSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MernRealestateSDK.test()
    equal(testsdk instanceof MernRealestateSDK, true,
      'MernRealestateSDK.test() must return a client synchronously')
  })

})
