import nodemailer from 'nodemailer';
//Enviar o email
export async function suporteEmail(req, res) {

    const { nome, email, cargo, problema, contato } = req.body

    const textoP = `Mano deu erro aqui, meu nome é ${nome} e sou ${cargo},
     você pode contatar comigo através do ${contato}, eu tive um problema no ${problema}
      e gostaria que você resolvesse por favor :)`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'supchecklist67@gmail.com',
            pass: 'sup.l1st'
    }
    });

    let mailOptions = {
        from: email,
        to:'supchecklist67@gmail.com',
        subject:problema,
        text:textoP
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log('Erro ao enviar o e-mail: ', err);
        } else{
            console.log('E-mail enviado com sucesso', info.response);
        }
    });
}