import React from 'react';
import { Email, Box, Item, A, Span, renderEmail } from 'react-html-email';

const textStyles = {
  fontFamily: 'helvetica',
  fontSize: 20,
  color: 'black',
};

const itemStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const emailHTML = (requesterName, shift1, shift2) => renderEmail (
  <Email title='ShiftSwap Request'>
    <Box>
      <Item {...itemStyles}>
        <div><Span {...textStyles}>{requesterName} has requested to swap shifts:</Span></div>
        <div><Span {...textStyles}> {shift1.date} {shift1.start}-{shift1.end} - {requesterName}</Span></div>
        <div><Span {...textStyles}> {shift2.date} {shift2.start}-{shift2.end} - You</Span></div>
        <div><Span>Follow this link to sign in and accept or deny the request:</Span></div>
        <div><A href="https://shift-swap.herokuapp.com">Go to ShiftSwap!</A></div>
      </Item>
    </Box>
  </Email>
);


export default emailHTML;
