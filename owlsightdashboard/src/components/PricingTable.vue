<template>
    <stripe-pricing-table pricing-table-id="prctbl_1Ng9r8C5aHNyJdzZ2JI51izj"
        publishable-key="pk_test_51Nch7ZC5aHNyJdzZYddKrc2rbf8d6akGOFT6MMeJR7pkSQ0HA5ccycRnROmvtrFRyTH8MWrTbl30LHPSdKVTe2Tt00HvLbQLWu"
        client-reference-id="test">
    </stripe-pricing-table>
</template>

<script>
import { firebaseAuth } from '@/api/firebaseauth.js';
import { users } from '../store/modules/users.js'

export default {
  name: 'PricingTable',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>