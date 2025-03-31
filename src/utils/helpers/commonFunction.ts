
const preprocessHtml = (html: any) => {
  // let processedHtml = html.replace(/^<p>(.*?)<\/p>/s, '<div>$1</div>');
  let processedHtml = html.replace(/<p>(.*?)<\/p>/gs, '<div style="margin: 3px 0;">$1</div>');
  processedHtml = processedHtml.replace(/background-color:\s*unset\s*;?/gi, '');

   // Remove margin and padding from <li> and <ol> tags
   processedHtml = processedHtml.replace(/<ol([^>]*)>/gi, '<ol$1 style="margin: 0; padding-left: 18px;padding-top:3px; list-style-position: inside;">');
   processedHtml = processedHtml.replace(/<ul([^>]*)>/gi, '<ul$1 style="margin: 0; padding-left: 10px; padding-top:0px; list-style-position: inside;">');
 
   // Adjust <li> padding for <ul> and not <ol>
   processedHtml = processedHtml.replace(/<ul([^>]*)>(.*?)<\/ul>/gs, (match: any, p1: any, p2: string) => {
     return `<ul${p1} style="margin: 0; padding-left: 18px;  list-style-position: inside;">${p2.replace(/<li([^>]*)>/gi, '<li$1 style="padding-left: 5px;">')}</ul>`;
   });
 
   processedHtml = processedHtml.replace(/<ol([^>]*)>(.*?)<\/ol>/gs, (match: any, p1: any, p2: string) => {
     return `<ol${p1} style="margin: 0; padding-left: 18px; list-style-position: inside;">${p2.replace(/<li([^>]*)>/gi, '<li$1 style="margin: 0;">')}</ol>`;
   });

     // Remove <br> tags inside <li> elements to prevent extra spacing
  processedHtml = processedHtml.replace(/<li([^>]*)>(.*?)<br\s*\/?>/gi, '<li$1>$2');
  return processedHtml;
};

const common = {
  preprocessHtml
}
export default common;

// html parsel