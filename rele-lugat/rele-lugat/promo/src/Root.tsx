import React from "react";
import { Composition } from "remotion";

import { FPS } from "./beats";
import { Main, TOTAL_FULL, TOTAL_SHORT, type MainProps } from "./Main";
import { LANGS, type Lang } from "./script";
import { SIZES } from "./theme";

/**
 * Kompozitsiyalar.
 *
 *   npx remotion studio                       — barchasini ko'rish
 *   npx remotion render Main30 out/a.mp4      — 30 s vertikal
 *   npx remotion render Main30 out/a-ru.mp4 --props='{"lang":"ru"}'
 */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Main30"
      component={Main}
      durationInFrames={TOTAL_FULL}
      fps={FPS}
      width={SIZES.vertical.width}
      height={SIZES.vertical.height}
      defaultProps={{ lang: "uz", aspect: "vertical", variant: "full" } satisfies MainProps}
      calculateMetadata={({ props }) => ({ props: normalize(props) })}
    />

    <Composition
      id="Main15"
      component={Main}
      durationInFrames={TOTAL_SHORT}
      fps={FPS}
      width={SIZES.vertical.width}
      height={SIZES.vertical.height}
      defaultProps={{ lang: "uz", aspect: "vertical", variant: "short" } satisfies MainProps}
      calculateMetadata={({ props }) => ({ props: { ...normalize(props), variant: "short" as const } })}
    />

    <Composition
      id="Square"
      component={Main}
      durationInFrames={TOTAL_FULL}
      fps={FPS}
      width={SIZES.square.width}
      height={SIZES.square.height}
      defaultProps={{ lang: "uz", aspect: "square", variant: "full" } satisfies MainProps}
      calculateMetadata={({ props }) => ({ props: { ...normalize(props), aspect: "square" as const } })}
    />
  </>
);

/** `--props='{"lang":"ru"}'` dan kelgan qiymatni tekshiradi. */
function normalize(props: MainProps): MainProps {
  const lang = (LANGS as readonly string[]).includes(props.lang) ? props.lang : ("uz" as Lang);
  return { ...props, lang };
}
