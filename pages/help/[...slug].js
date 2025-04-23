import { useRouter } from 'next/router';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  let page;
  
  if (slug && slug.length > 0) {
    page = slug[0];
  } else {
    page = 'index';
 }
 
   let displayedPath;
  
   if (slug && slug.length > 0) {
     displayedPath = slug.join('/');
   } else {
     displayedPath = 'help';
   }

  return (
    <div >
      <h1 >Help Page: {page.toUpperCase()}</h1>
      <p>Showing content for: <strong>{displayedPath}</strong></p>

      {page === 'faqs' && <p>here help about faqs</p>}
      {page === 'contact' && <p>Contact us at support@example.com.</p>}
      {page === 'privacy' && <p>This is our privacy policy.</p>}
    </div>
  );
}
