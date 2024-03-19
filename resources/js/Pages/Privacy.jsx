import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

function Privacy({ auth }) {
  
  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} sectionsBg={{ 'about': '--dark' }} sectionsText={{ 'about': 'white' }} />
        
        <header id="about" className='relative overflow-hidden py-48 text-center bg-[var(--main-blue)]'>
          <div className="absolute top-0 bottom-0">
            
          </div>
          <h1 className='relative z-10 text-white font-bold text-4xl'>Privacy Policy</h1>
        </header>

        <main className='my-12 mx-5 md:mx-24 mb-36 relative z-10'>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Information We Collect</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                When you use PrintHub, we may collect various types of information, including:
            </p>
            <ul class="list-disc ml-6">
                <li>Your name, email address, and date of birth when you create an account.</li>
                <li>Billing and shipping information when you place an order.</li>
                <li>Information about your interactions with PrintHub, such as pages visited and actions taken.</li>
                <li>Payment details (e.g., credit card information) processed securely through a third-party payment processor.</li>
                <li>Communication data when you contact us for customer support or other inquiries.</li>
                <li>User-generated content, if you choose to upload and share designs or other content on PrintHub.</li>
                <li>Device and browser information, including device type, operating system, and browser type.</li>
            </ul>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">How We Use Your Information</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                We use the collected information for the following purposes:
            </p>
            <ul class="list-disc ml-6">
                <li>Process orders, fulfill requests, and provide customer support.</li>
                <li>Enhance and personalize user experience.</li>
                <li>Improve and develop new features.</li>
                <li>Send order confirmations, updates, and promotional materials.</li>
                <li>Respond to your inquiries and provide support.</li>
                <li>Protect against unauthorized access and maintain the security of our services.</li>
                <li>Detect and prevent fraudulent activities.</li>
                <li>Conduct market research and analyze user behavior to improve our marketing strategies and services.</li>
            </ul>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Information Sharing</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                except as outlined in this Privacy Policy. We may share information with:
            </p>
            <ul class="list-disc ml-6">
                <li>Third-party service providers assisting in website operations.</li>
                <li>Legal authorities to comply with applicable laws and regulations.</li>
            </ul>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Your Choices</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                You can:
            </p>
            <ul class="list-disc ml-6">
                <li>Opt-out of promotional communications.</li>
                <li>Update your account information.</li>
                <li>Exercise your rights regarding your personal data as per applicable data protection laws.</li>
            </ul>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Security</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                We take reasonable measures to protect your information. However, no method of transmission over the internet
                or electronic storage is 100% secure.
            </p>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Cookies and Tracking Technologies</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                We use cookies and similar tracking technologies to enhance your experience on PrintHub. You can manage your
                cookie preferences through your browser settings.
            </p>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Children's Privacy</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                PrintHub is not intended for children under the age of 13. We do not knowingly collect personal information
                from children.
            </p>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Changes to this Privacy Policy</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                PrintHub reserves the right to update this Privacy Policy. Any changes will be posted on this page.
            </p>
            </div>
        </section>

        <section class="mt-8">
            <h2 class="font-bold text-4xl mb-4">Contact Us</h2>
            <div className='ml-5 text-gray-700'>
            <p>
                If you have any questions or concerns about this Privacy Policy, please
                <a href="#contact" class="text-blue-500"> contact us</a>.
            </p>
            </div>
        </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Privacy;