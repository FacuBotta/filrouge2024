export function html(params: { url: string }) {
  const { url } = params;

  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: '#F3D250',
    buttonBorder: 'black',
    buttonText: 'black',
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Bienvenue sur <strong>EventHub</strong> !
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 5px 0px 20px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Nous sommes ravis de vous accueillir. Pour continuer, cliquez sur le bouton ci-dessous pour commencer à utiliser votre compte !.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                Se connecter
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Si vous n'avez pas demandé cette connexion, vous pouvez ignorer cet email.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
export function text({ url }: { url: string }) {
  return `Bienvenue sur EventHub !\nNous sommes ravis de vous accueillir. Pour continuer, cliquez sur le lien suivant pour vous connecter:\n${url}\n\nSi vous n'avez pas demandé cette connexion, vous pouvez ignorer cet email.\n`;
}
