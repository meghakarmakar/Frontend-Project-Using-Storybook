import { InputField, DataTable } from './components';

function App() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Component Showcase</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">InputField</h2>
        <InputField label="Email" placeholder="Enter your email" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">DataTable</h2>
        <DataTable
          columns={[
            { key: 'name', header: 'Name', sortable: true },
            { key: 'email', header: 'Email' },
          ]}
          data={[
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
          ]}
        />
      </section>
    </div>
  );
}

export default App;
