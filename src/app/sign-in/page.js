import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#333A73] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[#333A73]">Sign In</h2>
        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#FBA834',
              colorText: '#333A73',
              colorBackground: '#FFFFFF',
              colorInputBackground: '#F3F4F6',
              colorInputText: '#333A73',
              colorInputBorder: '#E5E7EB',
              colorButtonBackground: '#FBA834',
              colorButtonText: '#FFFFFF',
              colorButtonHover: '#F9970E',
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            },
          }}
        />
      </div>
    </div>
  );
}
