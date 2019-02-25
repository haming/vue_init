<template>
  <input :id="ftid"
         :value="ftvalue"
         :type="fttype"
         ref="input"
         :readonly="ftreadonly"
         :maxLength="ftmax"
         :placeholder="ftplaceholder">
</template>
<script>
    export default {
        name: 'FtInput',
        props: {
            data: {
                id: String,
                max: Number,
                placeholder: String,
                readonly: Boolean,
                type: String,
                value: String
            },
        },
        data() {
            return {
                ftid: this.data.id,
                ftmax: this.data.max,
                ftplaceholder: this.data.placeholder,
                ftreadonly: this.data.readonly,
                fttype: this.data.type,
                ftvalue: this.data.value,
            }
        }
    }
</script>

