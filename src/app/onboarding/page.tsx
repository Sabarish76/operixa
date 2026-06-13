export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center p-6">
      <div className="w-full space-y-6 rounded-xl border p-6">
        <div>
          <h1 className="text-3xl font-bold">Create Your Workspace</h1>
          <p className="text-muted-foreground mt-2">
            create your organization before entering Operixa.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Organization Name
            </label>

            <input
              type="text"
              placeholder="Operixa Technologies"
              className="w-full rounded-md border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Organization Slug
            </label>

            <input
              type="text"
              placeholder="operixa-technologies"
              className="w-full rounded-md border p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 p-3 text-white"
          >
            Create Workspace
          </button>
        </form>
      </div>
    </div>
  );
}
