import { asJson } from "utils/proxy/api-helpers";
import credentialedProxyHandler from "utils/proxy/handlers/credentialed";

const mapContainerUpdates = (data) => {
  const json = asJson(data);
  const containerList = json?.data || [];
  const containerUpdates = Array.isArray(containerList)
    ? containerList.filter((c) => c?.updateInfo?.hasUpdate === true).length
    : 0;
  return {
    containerUpdates,
  };
};

const widget = {
  api: "{url}/api/{endpoint}",
  proxyHandler: credentialedProxyHandler,

  mappings: {
    // Arcane v2 (homepage widget version 1, default)
    containers: {
      endpoint: "environments/{env}/containers/counts",
      map: (data) => asJson(data).data,
    },
    images: {
      endpoint: "environments/{env}/images/counts",
      map: (data) => asJson(data).data,
    },
    updates: {
      endpoint: "environments/{env}/image-updates/summary",
      map: (data) => asJson(data).data,
    },
    containerUpdates: {
      endpoint: "environments/{env}/containers?limit=-1",
      map: mapContainerUpdates,
    },
    // Arcane v3 (homepage widget version 2)
    containers_v2: {
      endpoint: "agents/{env}/containers/counts",
      map: (data) => asJson(data).data,
    },
    images_v2: {
      endpoint: "agents/{env}/images/counts",
      map: (data) => asJson(data).data,
    },
    updates_v2: {
      endpoint: "agents/{env}/images/updates/summary",
      map: (data) => asJson(data).data,
    },
    containerUpdates_v2: {
      endpoint: "agents/{env}/containers?limit=-1",
      map: mapContainerUpdates,
    },
  },
};

export default widget;
