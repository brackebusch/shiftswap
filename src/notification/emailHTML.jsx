import React from 'react';
import { Email, Box, Item, A, Span, renderEmail } from 'react-html-email';

const textStyles = {
  fontFamily: 'helvetica',
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
};

const itemStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

// const listStyles = {
//   listStyle: 'none'
// };

// const buttonStyles = {
//   width: 120,
//   height: 50,
//   margin: 20,
//   backgroundColor: 'lightred',
//   color: 'white'
// };

const emailHTML = renderEmail (
  <Email title='link'>
    <Box>
      <Item {...itemStyles}>
        <div><Span {...textStyles}>Dylan has requested swap shifts:</Span></div>
        <div><Span {...textStyles}> 05/10/2018 5:00-7:00 - Dylan</Span></div>
        <div><Span {...textStyles}> 05/11/2018 7:00-9:00 - You</Span></div>
        <div><button>Accept</button><button>Decline</button></div>
      </Item>
    </Box>
  </Email>
);

export default emailHTML;
