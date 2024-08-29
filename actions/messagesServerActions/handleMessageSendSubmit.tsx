"use server";

import { checkIsAuthenticated } from "@/actions/authServerActions/checkIsAuthenticated";


export async function handleMessageSendSubmit(formData: FormData) {
  // TODO: formater les données du sender
  const sender  = await checkIsAuthenticated();
  const recipientId = formData.get('userRecipientId');
  const sujet = formData.get('sujet');
  const message = formData.get('message');
  console.log({ recipientId, sujet, message, sender });
}