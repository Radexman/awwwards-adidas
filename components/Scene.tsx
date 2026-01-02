import { View } from '@react-three/drei';

import { ShirtType } from '@/lib/textures';
import { FirstWhiteModel } from './FirstWhiteModel';
import { FirstGrayModel } from './FirstGrayModel';
import { FirstSportsModel } from './FirstSportsModel';
import { SecondModel } from './SecondModel';

type SceneProps = {
  shirtType: ShirtType;
};

const Scene = ({ shirtType }: SceneProps) => {
  return (
    <main className="min-h-screen">
      <section id="first-section" className="h-screen">
        <View className="h-dvh w-dvw">
          {shirtType === 'white' && <FirstWhiteModel />}
          {shirtType === 'gray' && <FirstGrayModel />}
          {shirtType === 'sport' && <FirstSportsModel />}
        </View>
      </section>
      <section id="second-section" className="h-screen">
        <View className="h-dvh w-dvw">
          <SecondModel shirtType={shirtType} />
        </View>
      </section>
      {/* <section id="third-section" className="h-screen">
        <View className="h-dvh w-dvw"></View>
      </section> */}
    </main>
  );
};

export default Scene;
