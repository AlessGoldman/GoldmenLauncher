import { useSyncExternalStore } from "react";
import { InstanceService } from "../../services/instance";
import ListTile from "../../components/ListTile";
import { MdFolder, MdOpenInNew, MdRefresh } from "react-icons/md";
import Button from "../../components/Button";
import { invoke } from "@tauri-apps/api";

export default function ModsView(props: { service: InstanceService }) {
  const service = props.service;
  const onRefresh = () => service.refresh().then().catch;

  useSyncExternalStore(service.subscribe, service.getSnapshot);

  return (
    <div className="p-3 space-y-3">
      <div className="flex space-x-3">
        <Button onClick={onRefresh}>
          <MdRefresh /> Refresh
        </Button>
        <Button
          onClick={() =>
            invoke("reveal_path", {
              pathname: service.dirs?.modsDir,
            }).then().catch
          }
          primary
        >
          <MdOpenInNew />
          Open Folder
        </Button>
      </div>
      {service.mods.map((value, index) => (
        <ListTile
          onClick={() => service.select(value)}
          active={service.selected(value)}
          key={index}
        >
          {value.dir && <MdFolder />}
          {value.name}
        </ListTile>
      ))}
      {service.mods.length === 0 && <p>No Items.</p>}
    </div>
  );
}
