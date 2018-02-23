import courier from 'courier-js';
import React from 'react';
import emailHTML from './emailHTML.jsx';

const allTemplates = {
  myTemplate: {
    template: emailHTML,
    filename: 'helloworld'
  }
};

const templateProps = {
  href: 'http://www.google.com'
};

const { render, compile, mailchimp } = courier({ allTemplates });

const mailchimpConfig = {
  key: 'somekey',
  datacente: 'dc'
};

const mailchimpOpts = {
  compaign: {},
  templateId: '',
  templateData: {
    name: 'Hello World',
    html: render('myTemplate', templateProps)
  }
};

compile('myTemplate', templateProps, __dirname);

const { init } = mailchimp(mailchimpConfig, mailchimpOpts);

init()
  .then(() => console.log('done sending campaign'))
  .catch((error) => console.log(error));
