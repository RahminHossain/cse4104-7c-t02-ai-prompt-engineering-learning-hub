const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the AI Prompt Engineering Learning Hub ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Platform Usage</h2>
          <p>
            The Platform provides educational content, an interactive playground for prompt evaluation, and a community marketplace. You agree to use the Platform only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
          <p>
            Prompts submitted to the Marketplace are the intellectual property of their respective creators, but by submitting them, you grant the Platform a non-exclusive, worldwide, royalty-free license to display and distribute them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Disclaimer of Warranties</h2>
          <p>
            The Platform is provided "as is". We do not warrant that the functions contained in the material will be uninterrupted or error-free. The AI evaluations provided in the Playground are simulated or provided by third-party APIs and are meant for educational purposes only.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
