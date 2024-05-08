import { IApi } from 'umi';


const applyHtmlTemplate = (api: IApi) => {
    api.modifyHTML(($) => {
        $(
            `<script src="/hls.js"></script>`,
        ).insertAfter('#root');
        return $;
    });
};

export default (api: IApi) => {
    applyHtmlTemplate(api);
};