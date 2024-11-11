<template>
  <div>{{ user }}</div>
  <div>{{ name }}</div>
  <button @click="name = 'qwer'">change name</button>
  <button @click="clear">clear</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { object, string, number, date, type InferType } from 'yup'
// import { object, string, number, date } from 'yup'
import { useModel, string as string2, type StringSchema } from 'vue-model'

const { name, clear } = useModel<{ name: string }>({
  name: {
    default: '123',
  },
})

const nameSchema: StringSchema = string2().required()

// const userSchema = object({
//   name: string().required(),
//   age: number().required().positive().integer(),
//   email: string().email(),
//   website: string().url().nullable(),
//   createdOn: date().default(() => new Date()),
// })

// const qwe = string().required().strict(false)

// type User = InferType<typeof userSchema>

const user = ref()

async function validate() {
  // const _user = await userSchema.validate({
  //   name: '123',
  //   age: 12,
  //   email: '123@123.ru',
  //   website: '',
  // })

  // console.log(_user)

  // const _user2 = await qwe.validate(123)

  // console.log(typeof _user2, _user2)

  // user.value = _user2

  const res = nameSchema.validate(123)
  console.log(typeof res, res)
}

validate()
</script>

<style scoped></style>
