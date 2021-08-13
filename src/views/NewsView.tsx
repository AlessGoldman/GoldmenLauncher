import { MdArrowDownward } from "react-icons/md";
import { List, ListItem } from "../components/lists";
import { t } from "../intl";
import { openInBrowser } from "../models/open";
import { DefaultFn } from "../tools";
import { homePageStore } from "./HomePage";

export default function NewsView(props: { close: DefaultFn }): JSX.Element {
  return (
    <>
      <div className="flex-grow" />
      <div
        className="w-11/12 bg-card rounded-t-xl overflow-y-auto"
        style={{ height: "calc(100vh * 0.833333)" }}
      >
        <div className="flex items-center bg-card z-10 p-6 border-b border-divider top-0 sticky">
          <p className="font-semibold text-xl flex-grow">{t("news")}</p>
          <MdArrowDownward
            className="text-contrast cursor-pointer"
            onClick={props.close}
          />
        </div>
        <List className="p-6">
          {homePageStore.news?.map((val, index) => (
            <ListItem
              className="rounded-lg p-1"
              key={index}
              onClick={() => openInBrowser(val.url)}
            >
              <p>{val.title}</p>
              <div className="flex-grow" />
              <div className="flex flex-col items-end">
                <p>{val.author}</p>
                <p className="text-shallow">{val.time}</p>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}