import SignupForm from "../components/Auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col sm:flex-row gap-20 items-center justify-center sm:items-start">
        <SignupForm />
        <img
          src="/signupImage.svg"
          alt="logo"
          width={350}
          height={100}
          className="mt-12 hidden sm:block"
        />
      </main>
    </div>
  );
};

export default SignUp;
