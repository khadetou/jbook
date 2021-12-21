import * as esbuild from "esbuild-wasm";
import axios from "axios";
import lacalForage from "localforage";

const fileCache = lacalForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode?: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      //SHARED CODE
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
      });

      //FOR CSS FILES
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
              const style = document.createElement("style");
              style.innerText = '${escaped}';
              document.head.appendChild(style);
           `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        //Store in cache
        await fileCache.setItem(args.path, result);

        return result;
      });

      //FOR JS FILES
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        //Store in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
