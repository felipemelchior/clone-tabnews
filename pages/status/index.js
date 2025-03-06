import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function findKey(obj, key) {
  if (key in obj) return obj[key];

  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null) {
      const result = findKey(value, key);
      if (result !== undefined) return result;
    }
  }
}

export default function StatusPage() {
  return (
    <>
      <h1>Database Status</h1>
      <DatabaseInfo text="Last Update" informationName="updated_at" />
      <DatabaseInfo text="Max Connections" informationName="max_connections" />
      <DatabaseInfo text="Postgres Version" informationName="version" />
      <DatabaseInfo
        text="Opened Connections"
        informationName="opened_connections"
      />
    </>
  );
}

function DatabaseInfo({ text, informationName }) {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let statusText = "Loading...";
  console.log(data);
  if (!isLoading && data) {
    if (informationName === "updated_at") {
      statusText = new Date(findKey(data, informationName)).toLocaleString(
        "pt-BR",
      );
    } else {
      statusText = findKey(data, informationName);
    }
  }

  return (
    <pre>
      {text}: {statusText}
    </pre>
  );
}
