import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
require('dotenv').config();

const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_USER = process.env.EMAIL_USER

const transporter = nodemailer.createTransport({
// here i used smtp from hotmail, but u can choose another if you want.
// remember that you have to use the port accordingly to the email.

  port: 587,
  host: "smtp-mail.outlook.com",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },

});

export const sendMail = (req: Request, res: Response) => {


  const mailData = {
    from: 'Company name <emailthatsends@hotmail.com>',
    to: 'email@gmail.com,', 
    subject: 'Novo contato',
    html: templateMail(req.body)
  }

  transporter.sendMail(mailData, (error, info) => error
    ? res.status(400).send({ message: "Fail, email not send", error: error })
    : res.status(200).send({ message: "Email send", id: info.messageId }));
  transporter.close();
}


const templateMail = (form: any) => {
  const { name, age, email,
    phone, carmodel, city, 
    carcolors, notthiscolors, 
    maxpricefound,minpricefound,
    moneyavailable,maxkm, minyear, maxyear } = form;
        
    return `<!DOCTYPE html> 
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 80%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: center;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>
    
    <h2>Formulário de contato</h2> ${name}
    <p>Veículo escolhido: ${carmodel} </p>
    
    <table>
      <tr>
        <th>INFORMAÇÕES DE CONTATO</th>
        <th> CARRO E CORES </th>
        <th>VALORES NO OLX FORTALEZA</th>
      </tr>
      <tr>
        <td> Nome: ${name} </td>
        <td>Carro: ${carmodel}</td>
        <td>Menor Valor: ${minpricefound}</td>
      </tr>
      <tr>
        <td>Email: ${email}</td>
        <td> Do Ano: ${minyear} </td>
        <td>Maior Valor: ${maxpricefound}</td>
      </tr>
      <tr>
        <td>Telefone: ${phone}</td>
        <td>Até o ano: ${maxyear}</td>
        <td>Quanto posso pagar: ${moneyavailable}</td>
      </tr>
      <tr>
        <td>Cidade: ${city} </td>
        <td>Quilometragem Máxima: ${maxkm}</td>
        <td></td>
      </tr>
      <tr>
        <td>Idade: ${age}</td>
        <td> Cores de preferência: ${carcolors} </td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>Cores Bloqueadas:${notthiscolors}</td>
        <td></td>
      </tr>
    </table>
  </body>
</html>`;

}
