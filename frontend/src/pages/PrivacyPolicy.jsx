const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create or modify your account, participate in interactive features of our services, or communicate with us. This includes your name, email address, and profile biography.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Prompt Data and Playground</h2>
          <p>
            When you use the AI Prompt Playground, the prompts you submit are processed to provide evaluation feedback. We may store anonymized versions of these prompts to improve our evaluation algorithms and system performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Marketplace Data</h2>
          <p>
            Prompts that you choose to publish to the Marketplace become public. Any information you include in a published prompt, including your username as the author, will be visible to other users of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Analytics and Tracking</h2>
          <p>
            We collect platform usage data, such as module completion rates, challenge success rates, and login frequency, to populate the Admin Analytics dashboard and improve the overall learning experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to maintain the safety of your personal information. Authentication is handled securely via JSON Web Tokens (JWT).
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
