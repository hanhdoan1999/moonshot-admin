import { IncomingMessage } from "node:http";
import { GetMainLayoutPropsParams, GetNextAdminPropsParams } from "./types";
import {
  getMainLayoutProps as _getMainLayoutProps,
  getPropsFromParams,
} from "./utils/props";
import { formatSearchFields, getParamsFromUrl } from "./utils/server";

// Router
export const getNextAdminProps = async ({
  prisma,
  basePath,
  apiBasePath,
  options,
  req,
  locale,
}: Omit<GetNextAdminPropsParams, "params" | "searchParams" | "isAppDir"> & {
  req: IncomingMessage;
}) => {
  const params = getParamsFromUrl(req.url!, basePath);
  const requestOptions = formatSearchFields(req.url!);

  const props = await getPropsFromParams({
    options,
    prisma,
    basePath,
    apiBasePath,
    searchParams: requestOptions,
    params,
    isAppDir: false,
    locale,
  });

  return { props };
};

export const getMainLayoutProps = (
  args: Omit<GetMainLayoutPropsParams, "isAppDir" | "params">
) => _getMainLayoutProps({ ...args, isAppDir: false });
