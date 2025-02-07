type ErrorMessageProps = {
  errors?: Record<string, string[]>;
};
export default function ErrorMessages({ errors }: ErrorMessageProps) {
  if (!errors) return null;
  return (
    <div className="bg-red-50 rounded-md p-2 text-red-600 mt-8 text-sm">
      <h6 className="text-sm font-bold mb-4">Validation Errors:</h6>
      {Object.keys(errors! ?? {}).flatMap((key) => (
        <div key={key}>{errors![key]}</div>
      ))}
    </div>
  );
}
