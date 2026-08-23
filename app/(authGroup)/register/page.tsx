import RegisterForm from "../_compunents/RegisterFrom";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10 ">
      <div className="w-full max-w-md space-y-6 border shadow rounded-2xl p-5">
        <div className="space-y-2 text-center ">
          <h1 className="text-3xl font-bold">
            Create an Account
          </h1>

          <p className="text-sm text-muted-foreground">
            Join GearUp and start renting sports gear.
          </p>
        </div>

        <RegisterForm/>
      </div>
    </main>
  );
}