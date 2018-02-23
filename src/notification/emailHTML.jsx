import React from 'react';
import { Email, Box, Item, A, Span, renderEmail } from 'react-html-email';

const textStyles = {
  fontFamily: 'helvetica',
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
};

const emailHTML = renderEmail (
  <Email title='link'>
    <Box>
      <Item>
        <ul>
          <Span {...textStyles}>Dylan has requested swap shifts:</Span>
          <Span {...textStyles}> 05/10/2018 5:00-7:00 - Dylan</Span>
          <Span {...textStyles}> 05/11/2018 7:00-9:00 - You</Span>
          <li>
            <div>Accept</div>
            <div>Decline</div>
          </li>
        </ul>
      </Item>
    </Box>
  </Email>
);

export default emailHTML;
