const EF_FD = 7;
const EF_FR = 3;
const EF_VD = 5;
const EF_VR = 7;

const NF_FD = 2;
const NF_FR = 15;
const NF_VD = 8;
const NF_VR = 4;

const W_FD = 6;
const W_FR = 4;
const W_VD = 12;
const W_VR = 2;

import t from '../../Theme/theme';

const demoData = {
  name: 'with color',
  captions: {
    // columns
    fd: 'Fondo derecha',
    fr: 'Fondo revés',
    vd: 'Volea derecha',
    vr: 'Volea revés',
  },
  chart: [
    // data
    {
      data: {
        fd: 1,
        fr: EF_FR / EF_FD,
        vd: EF_VD / EF_FD,
        vr: 1,
      },
      meta: {
        color: t.bgInfo.backgroundColor,
        strokeWidth: 2,
      },
    },
    {
      data: {
        fd: NF_FD / NF_FR,
        fr: 1,
        vd: NF_VD / NF_FR,
        vr: NF_VR / NF_FR,
      },
      meta: {
        color: t.bgError.backgroundColor,
        strokeWidth: 2,
      },
    },
    {
      data: {
        fd: W_FD / W_VD,
        fr: W_FD / W_VD,
        vd: 1,
        vr: W_VR / W_VD,
      },
      meta: {
        color: t.bgSuccess.backgroundColor,
        strokeWidth: 2,
      },
    },
    // {
    //   data: {fd: 0.2, fr: 1, vd: 0.9, vr: 0.8},
    //   meta: {color: `${t.bgError.backgroundColor}90`},
    // },
    // {
    //   data: {fd: 1, fr: 1, vd: 0.9, vr: 0.8},
    //   meta: {color: `${t.bgSuccess.backgroundColor}90`},
    // },
  ],
};

export default demoData;
