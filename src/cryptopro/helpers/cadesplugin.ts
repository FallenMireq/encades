declare const cadesplugin: any;

const _cadesplugin = cadesplugin;
export { _cadesplugin as cadesplugin };

export const isAsync = !!cadesplugin.CreateObjectAsync;
