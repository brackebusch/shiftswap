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

const emailHTML = (shift1, shift2) => renderEmail (
  <Email title='ShiftSwap Request'>
    <Box>
      <Item {...itemStyles}>
        <div><Span {...textStyles}>{shift2.title} has requested to swap shifts:</Span></div>
        <div><Span {...textStyles}>{shift2.start} - {shift2.end} - {shift2.title}</Span></div>
        <div><Span {...textStyles}>{shift1.start} - {shift1.end} - You</Span></div>
        <div><button>Accept</button><button>Decline</button></div>
      </Item>
    </Box>
  </Email>
);
// const emailHTML = (requesterName, shift1, shift2) => {
//   return (
//     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
//     <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
//       <head>
//         <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//         <title>link</title>
//         <style type="text/css"></style>
//       </head>
//       <body style="width:100%;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
//         <table width="100%" height="100%" cellpadding="0" cellspacing="0">
//           <tbody>
//             <tr>
//               <td>
//                 <table width="600" cellpadding="0" cellspacing="0">
//                   <tbody>
//                     <table cellpadding="0" cellspacing="0">
//                       <tbody>
//                         <tr>
//                           <td>
//                             <div>Dylan has requested swap shifts:</div>
//                             <div>05/10/2018 7:00-9:00 - Dylan</div>
//                             <div>05/11/2018 9:00-11:00 - You</div>
//                             <div>
//                               <button>Accept</button>
//                               <button>Decline</button>
//                             </div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </tbody>
//                 </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </body>
//     </html>
//   )
// }


export default emailHTML;
