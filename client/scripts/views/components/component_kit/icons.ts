import m from 'mithril';

export enum IconStates {
  Default = 'default',
  Hover = 'hover',
}

export enum IconColors {
  Black = '#000000',
  DarkGray = '#333333',
  MidiGray = '#666666',
  LiteGray = '#999999',
  DisableGray = '#DDDDDD',
}

export const ArrowDown: m.Component<{ color?: string, size?: number; }, { color: string }> = {
  view: (vnode) => {
    return m('svg.ArrowDown', {
      'width': `${vnode.attrs.size || 14}`, //15
      'height': `${vnode.attrs.size || 14}`, //16
      'fill':'none',
      'xmlns':'http://www.w3.org/2000/svg'
    }, [
      m('path', {
        'd':'m14.036 3.671-6.464 7.66-6.465-7.66',
        'stroke': IconColors.LiteGray,
        'stroke-width':'2',
        'stroke-linecap':'round'
      })
    ]);
  }
}

export const ArrowRight: m.Component<{ color?: string, size?: number; }, {}> = {
  view: (vnode) => {
    let stateColor;
    return m('svg.ArrowRight', {
      'width': `${vnode.attrs.size || 14}`, //15
      'height': `${vnode.attrs.size || 14}`, //15
      'fill':'none',
      'xmlns':'http://www.w3.org/2000/svg'
    }, [
      m('path', {
        'd':'m4.027 1.036 7.658 6.465-7.658 6.464',
        'stroke': IconColors.LiteGray,
        'stroke-width':'2',
        'stroke-linecap':'round'
      })
    ]);
  }
}

export const Likes: m.Component<{ color?: string, size?: number; }, {}> = {
  view: (vnode) => {
    let stateColor;
    return m('svg.Likes', {
      'width':'20',
      'height':'17',
      'fill':'none',
      'xmlns':'http://www.w3.org/2000/svg'
    }, [
      m('path', {
        'd':'M10.887 15.088a1 1 0 0 1-1.393 0L4.077 9.826l-.738-.717a4.668 4.668 0 0 1-1.425-3.348c0-1.262.516-2.466 1.425-3.349A4.888 4.888 0 0 1 6.744 1.04c1.272 0 2.498.49 3.405 1.372l.042.04.04-.04h.001c.45-.437.982-.782 1.566-1.017a4.927 4.927 0 0 1 3.678 0 4.84 4.84 0 0 1 1.566 1.017l-6.155 12.676Zm0 0 5.417-5.262m-5.416 5.262 5.416-5.262m0 0 .738-.717m-.738.717.738-.717m0 0s0 0 0 0m0 0h0m0 0c.45-.437.809-.957 1.054-1.532M17.042 9.11l1.054-1.532m0 0a4.628 4.628 0 0 0 .372-1.816m-.372 1.816.372-1.816m0 0c0-.624-.127-1.242-.372-1.817m.372 1.817-.372-1.817m0 0a4.715 4.715 0 0 0-1.053-1.531l1.053 1.531Z',
        'stroke': IconColors.MidiGray,
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      })
    ]);
  }
}

export const Replies: m.Component<{ color?: string, size?: number; }, {}> = {
  view: (vnode) => {
      return m('svg.Replies', {
        'width': `${vnode.attrs.size || 14}`, //'17',
        'height': `${vnode.attrs.size || 14}`, // '17',
        'fill':'none',
        'xmlns':'http://www.w3.org/2000/svg'
      }, [
        m('path', {
          'd':'M1.858 14.322a1 1 0 0 0 1.73.684l2.243-2.393h7.185c.624 0 1.208-.265 1.628-.713a2.402 2.402 0 0 0 .642-1.641V3.487c0-.605-.224-1.196-.642-1.642a2.231 2.231 0 0 0-1.628-.713H4.128a2.23 2.23 0 0 0-1.627.713 2.401 2.401 0 0 0-.643 1.642v10.835Z',
          'stroke': IconColors.MidiGray,
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round'
        })
      ]
    );
  }
}

export const Views: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
      vnode.attrs.color = IconColors.MidiGray;
      return null;
    }
}

export const Discuss: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Like: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Reply: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Share: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Subscribe: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Account: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Copy: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Create: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Filter: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Notification: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const Search: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

export const X: m.Component<{ color?: string, size?: number; }, {}> = {
    view: (vnode) => {
        return 
    }
}

// SOCIAL ICONS

export const ElementIcon: m.Component<{ color?: string, size?: number; }, {}> = {
  view: (vnode) => {
    return m('svg.ElementIcon', {'width':'15','height':'15','fill':'none','xmlns':'http://www.w3.org/2000/svg'}, 
      m('path', {'d':'M7 7.5h1m-4 0h1m5 0h1m3.5 7h-7a7 7 0 1 1 7-7v7Z','stroke':'#000'})
    )
  }
}

export const DiscordIcon: m.Component<{ iconState?: IconStates, color?: string, size?: number; }, {}> = {
  view: (vnode) => {
    return m('svg.DiscordIcon', {'width':'15','height':'15','fill':'none','xmlns':'http://www.w3.org/2000/svg'}, 
      m('path', {'d':'m11.5 13.5-.326.379a.5.5 0 0 0 .342.12L11.5 13.5Zm-1.066-1.712a.5.5 0 0 0-.785.62l.785-.62Zm.398-.41-.174-.468a.672.672 0 0 0-.02.007l.194.461Zm-1.738.516L9.01 11.4l-.008.001.092.492Zm-3.104-.012-.095.49.003.001.092-.491Zm-1.762-.515-.182.465.182-.466Zm-.875-.408-.278.415a.46.46 0 0 0 .033.021l.245-.436Zm-.108-.06.277-.416a.491.491 0 0 0-.054-.031l-.223.447Zm-.048-.036.353-.354a.502.502 0 0 0-.11-.083l-.243.437Zm2.154 1.52a.5.5 0 0 0-.785-.62l.785.62ZM3.5 13.5l-.016.5a.5.5 0 0 0 .347-.125L3.5 13.5Zm-3-2.253H0a.5.5 0 0 0 .006.08l.494-.08Zm1.726-8.488-.3-.4a.5.5 0 0 0-.168.225l.468.175ZM5.594 1.5l.498-.047A.5.5 0 0 0 5.605 1l-.01.5Zm-.378 1.306a.5.5 0 0 0 .996-.095l-.996.095Zm3.526-.063a.5.5 0 0 0 .992.127l-.992-.127ZM9.406 1.5 9.395 1a.5.5 0 0 0-.485.436l.496.064Zm3.368 1.259.468-.175a.5.5 0 0 0-.168-.225l-.3.4Zm1.726 8.488.494.08a.497.497 0 0 0 .006-.08h-.5ZM6.481 8.8l-.5-.008v.008h.5ZM11.5 13.5l.326-.379-.002-.002a.794.794 0 0 1-.044-.038 21.355 21.355 0 0 1-.536-.48c-.325-.298-.66-.622-.81-.813l-.785.62c.208.264.603.64.918.93a29.109 29.109 0 0 0 .593.53l.01.008.003.002.327-.378Zm.436-3.246c-.46.303-.894.513-1.278.656l.348.937a7.352 7.352 0 0 0 1.48-.758l-.55-.835Zm-1.297.663a7.387 7.387 0 0 1-1.629.484l.168.986a8.39 8.39 0 0 0 1.848-.548l-.387-.922Zm-1.637.485a7.895 7.895 0 0 1-2.92-.012l-.184.983a8.896 8.896 0 0 0 3.288.012l-.184-.983Zm-2.917-.011a9.57 9.57 0 0 1-1.675-.49l-.364.931c.512.2 1.13.402 1.849.54l.19-.981Zm-1.675-.49a6.536 6.536 0 0 1-.813-.378l-.489.872c.326.183.648.324.938.437l.364-.931Zm-.78-.358c-.047-.032-.093-.054-.108-.061-.02-.01-.011-.007 0 .001l-.555.832c.048.032.093.054.108.061.021.01.012.007 0-.002l.556-.83Zm-.162-.091c.02.01.04.022.06.038.017.014.03.026.022.02l-.707.707c.023.023.081.08.178.13l.447-.895Zm-.028-.026a4.697 4.697 0 0 1-.28-.168l-.011-.008a.025.025 0 0 0-.001 0l-.287.41-.286.409.001.001.002.002.007.004.021.014.075.049c.064.04.156.096.273.161l.486-.874Zm1.126 1.338c-.152.193-.489.525-.813.829a30.38 30.38 0 0 1-.538.491l-.034.031-.01.008-.001.002h-.001l.331.375.331.375.001-.001.003-.002.01-.009.036-.032a38.039 38.039 0 0 0 .555-.508c.315-.296.708-.677.915-.94l-.785-.62ZM3.516 13c-1.166-.037-1.778-.521-2.11-.96a2.394 2.394 0 0 1-.4-.82 1.1 1.1 0 0 1-.013-.056v.002l-.493.08c-.494.08-.494.08-.493.081v.006a1.367 1.367 0 0 0 .028.127 3.394 3.394 0 0 0 .573 1.183c.505.667 1.393 1.31 2.876 1.357l.032-1ZM1 11.247c0-1.867.42-3.94.847-5.564a35.45 35.45 0 0 1 .776-2.552 16.43 16.43 0 0 1 .067-.186l.004-.01v-.001l-.468-.175-.469-.175v.001l-.001.003-.004.011a9.393 9.393 0 0 0-.072.2 36.445 36.445 0 0 0-.8 2.629C.443 7.083 0 9.253 0 11.247h1Zm1.526-8.088c.8-.6 1.577-.89 2.15-1.03a4.764 4.764 0 0 1 .86-.128A1.48 1.48 0 0 1 5.585 2h-.001l.01-.5.01-.5H5.6a.848.848 0 0 0-.028 0L5.504 1a3.973 3.973 0 0 0-.24.016 5.763 5.763 0 0 0-.825.141 6.938 6.938 0 0 0-2.513 1.2l.6.8Zm2.57-1.612.12 1.259.996-.095-.12-1.258-.996.094ZM9.734 2.87l.168-1.306-.992-.128-.168 1.307.992.127ZM9.406 1.5l.01.5h-.001a.497.497 0 0 1 .049 0c.038.002.1.005.179.013.16.014.394.047.681.117.573.14 1.35.429 2.15 1.029l.6-.8a6.937 6.937 0 0 0-2.513-1.2 5.76 5.76 0 0 0-.825-.142A3.98 3.98 0 0 0 9.399 1h-.003l.01.5Zm3.368 1.259-.469.174.001.003.004.009.013.037.053.149a35.482 35.482 0 0 1 .777 2.552c.428 1.624.847 3.697.847 5.564h1c0-1.994-.444-4.164-.88-5.819a36.512 36.512 0 0 0-.8-2.629 15.246 15.246 0 0 0-.057-.158l-.015-.042-.004-.01-.001-.004-.47.174Zm1.726 8.488-.493-.08v-.003l-.002.008-.01.047c-.012.045-.03.113-.061.197-.062.17-.167.396-.34.624-.332.439-.944.923-2.11.96l.032 1c1.483-.047 2.37-.69 2.876-1.356a3.395 3.395 0 0 0 .573-1.184 2.05 2.05 0 0 0 .026-.118l.002-.01v-.004c0-.001 0-.002-.493-.081ZM5.259 6.97c-1.002 0-1.723.867-1.723 1.83h1c0-.498.357-.83.723-.83v-1ZM3.536 8.8c0 .967.736 1.83 1.723 1.83v-1c-.357 0-.723-.334-.723-.83h-1Zm1.723 1.83c1 0 1.722-.866 1.722-1.83h-1c0 .5-.357.83-.722.83v1ZM6.98 8.81c.016-.978-.728-1.84-1.722-1.84v1.001c.372 0 .73.338.722.822l1 .017Zm2.653-1.84c-1.002.001-1.723.868-1.723 1.831h1c0-.498.357-.83.723-.83v-1ZM7.91 8.802c0 .967.736 1.83 1.723 1.83v-1c-.357 0-.723-.334-.723-.83h-1Zm1.723 1.83c1 0 1.722-.866 1.722-1.83h-1c0 .5-.357.83-.722.83v1Zm1.722-1.83c0-.963-.721-1.83-1.722-1.83v1c.365 0 .722.332.722.83h1ZM3.74 4.44c1.443-.787 2.619-1.154 3.763-1.155 1.145 0 2.318.365 3.758 1.154l.48-.876c-1.522-.835-2.865-1.279-4.238-1.278-1.373 0-2.717.445-4.241 1.277l.478.878Z','fill':'#000'})
    )
  }
}

export const TelegramIcon: m.Component<{ iconState?: IconStates, color?: string, size?: number; }, {}> = {
  view: (vnode) => {
    return m('svg.TelegramIcon', {'width':'15','height':'15','fill':'none','xmlns':'http://www.w3.org/2000/svg'}, 
      m('path', {'d':'m14.5 1.5-14 5 4 2 6-4-4 5 6 4 2-12Z','stroke':'#000','stroke-linejoin':'round'})
    )
  }
}

export const GithubIcon: m.Component<{ iconState?: IconStates, color?: string, size?: number; }, {}> = {
  view: (vnode) => {
      return m('svg.GithubIcon', {'width':'15','height':'15','fill':'none','xmlns':'http://www.w3.org/2000/svg'}, 
        m('path', {'d':'M5.65 12.477a.5.5 0 1 0-.3-.954l.3.954Zm-3.648-2.96-.484-.128-.254.968.484.127.254-.968ZM9 14.5v.5h1v-.5H9Zm.063-4.813-.054-.497a.5.5 0 0 0-.299.852l.352-.354ZM12.5 5.913h.5V5.91l-.5.002Zm-.833-2.007-.466-.18a.5.5 0 0 0 .112.533l.354-.353Zm-.05-2.017.456-.204a.5.5 0 0 0-.319-.276l-.137.48Zm-2.173.792-.126.484a.5.5 0 0 0 .398-.064l-.272-.42Zm-3.888 0-.272.42a.5.5 0 0 0 .398.064l-.126-.484ZM3.383 1.89l-.137-.48a.5.5 0 0 0-.32.276l.457.204Zm-.05 2.017.354.353a.5.5 0 0 0 .112-.534l-.466.181ZM2.5 5.93H3v-.002l-.5.002Zm3.438 3.758.352.355a.5.5 0 0 0-.293-.851l-.06.496ZM5.5 11H6l-.001-.037L5.5 11ZM5 14.5v.5h1v-.5H5Zm.35-2.977c-.603.19-.986.169-1.24.085-.251-.083-.444-.25-.629-.49a4.8 4.8 0 0 1-.27-.402c-.085-.139-.182-.302-.28-.447-.191-.281-.473-.633-.929-.753l-.254.968c.08.02.184.095.355.346.082.122.16.252.258.412.094.152.202.32.327.484.253.33.598.663 1.11.832.51.168 1.116.15 1.852-.081l-.3-.954Zm4.65-.585c0-.318-.014-.608-.104-.878-.096-.288-.262-.51-.481-.727l-.705.71c.155.153.208.245.237.333.035.105.053.254.053.562h1Zm-.884-.753c.903-.097 1.888-.325 2.647-.982.78-.675 1.237-1.729 1.237-3.29h-1c0 1.359-.39 2.1-.892 2.534-.524.454-1.258.653-2.099.743l.107.995ZM13 5.91a3.354 3.354 0 0 0-.98-2.358l-.707.706c.438.44.685 1.034.687 1.655l1-.003Zm-.867-1.824c.15-.384.22-.794.21-1.207l-1 .025a2.12 2.12 0 0 1-.142.82l.932.362Zm.21-1.207a3.119 3.119 0 0 0-.27-1.195l-.913.408c.115.256.177.532.184.812l1-.025Zm-.726-.99c.137-.481.137-.482.136-.482h-.003l-.004-.002a.462.462 0 0 0-.03-.007 1.261 1.261 0 0 0-.212-.024 2.172 2.172 0 0 0-.51.054c-.425.091-1.024.317-1.82.832l.542.84c.719-.464 1.206-.634 1.488-.694.14-.03.23-.033.273-.032.022 0 .033.002.033.002l-.008-.001a.278.278 0 0 1-.01-.002l-.006-.002h-.003l-.002-.001c-.001 0-.002 0 .136-.482Zm-2.047.307a8.209 8.209 0 0 0-4.14 0l.252.968a7.209 7.209 0 0 1 3.636 0l.252-.968Zm-3.743.064C5.03 1.746 4.43 1.52 4.005 1.43a2.17 2.17 0 0 0-.51-.053 1.259 1.259 0 0 0-.241.03l-.004.002h-.003l.136.481.137.481h-.001l-.002.001-.003.001a.327.327 0 0 1-.016.004l-.008.001h.008a1.19 1.19 0 0 1 .298.03c.282.06.769.23 1.488.694l.543-.84Zm-2.9-.576a3.12 3.12 0 0 0-.27 1.195l1 .025c.006-.28.068-.556.183-.812l-.913-.408Zm-.27 1.195c-.01.413.06.823.21 1.207l.932-.362a2.12 2.12 0 0 1-.143-.82l-1-.025Zm.322.673a3.354 3.354 0 0 0-.726 1.091l.924.38c.118-.285.292-.545.51-.765l-.708-.706Zm-.726 1.091A3.354 3.354 0 0 0 2 5.93l1-.003c0-.31.06-.616.177-.902l-.924-.38ZM2 5.93c0 1.553.458 2.597 1.239 3.268.757.65 1.74.88 2.64.987l.118-.993C5.15 9.09 4.416 8.89 3.89 8.438 3.388 8.007 3 7.276 3 5.928H2Zm3.585 3.404c-.5.498-.629 1.09-.584 1.704L6 10.963c-.03-.408.052-.683.291-.921l-.705-.709ZM5 11v3.5h1V11H5Zm5 3.5V13H9v1.5h1Zm0-1.5v-2.063H9V13h1Z','fill':'#000'})
      )
  }
}

export const WebsiteIcon: m.Component<{ iconState?: IconStates, color?: string, size?: number; }, {}> = {
  view: (vnode) => {
      return m('svg.WebsiteIcon', {'width':'15','height':'15','fill':'none','xmlns':'http://www.w3.org/2000/svg'}, 
        m('path', {'d':'M4.5 5.5V5a.5.5 0 0 0-.5.5h.5Zm0 1 .354.354L5 6.707V6.5h-.5Zm-1.707.293-.354.353.354-.353ZM6.5 13H7v-.207l-.146-.147L6.5 13Zm-1-1H5v.207l.146.147L5.5 12Zm0-1.5H6v-.207l-.146-.147-.354.354Zm-1-1H4v.207l.146.147L4.5 9.5Zm0-1V8a.5.5 0 0 0-.5.5h.5ZM9 .5v2h1v-2H9ZM8.5 3h-1v1h1V3Zm-3 2h-1v1h1V5ZM4 5.5v1h1v-1H4Zm.146.646-.292.293.707.707.293-.292-.708-.708Zm-1 .293L1.354 4.646l-.708.708L2.44 7.146l.707-.707ZM6 4.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 7 4.5H6ZM7.5 3A1.5 1.5 0 0 0 6 4.5h1a.5.5 0 0 1 .5-.5V3ZM3.854 6.44a.5.5 0 0 1-.708 0l-.707.706a1.5 1.5 0 0 0 2.122 0l-.707-.707ZM9 2.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 10 2.5H9Zm-2 12V13H6v1.5h1Zm-.146-1.854-1-1-.708.708 1 1 .708-.708ZM6 12v-1.5H5V12h1Zm-.146-1.854-1-1-.708.708 1 1 .708-.708ZM5 9.5v-1H4v1h1ZM4.5 9h4V8h-4v1Zm4.5.5v.667h1V9.5H9Zm1.833 2.5H13.5v-1h-2.667v1ZM10 11.167c0 .46.373.833.833.833v-1c.092 0 .167.075.167.167h-1ZM9.833 11c.092 0 .167.075.167.167h1C11 10.522 10.478 10 9.833 10v1ZM9 10.167c0 .46.373.833.833.833v-1c.092 0 .167.075.167.167H9ZM8.5 9a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 8.5 8v1Zm-1 5A6.5 6.5 0 0 1 1 7.5H0A7.5 7.5 0 0 0 7.5 15v-1ZM14 7.5A6.5 6.5 0 0 1 7.5 14v1A7.5 7.5 0 0 0 15 7.5h-1ZM7.5 1A6.5 6.5 0 0 1 14 7.5h1A7.5 7.5 0 0 0 7.5 0v1Zm0-1A7.5 7.5 0 0 0 0 7.5h1A6.5 6.5 0 0 1 7.5 1V0Z','fill':'#000'})
      )
  }
}



