"use server";

export async function handleSubmit(formData: FormData) {
  const id = formData.get('id');
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  console.log(id, name, email, message);
}