import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { View } from '@react-three/drei';

import { ShirtType } from '@/lib/textures';
import { FirstWhiteModel } from './FirstWhiteModel';
import { FirstGrayModel } from './FirstGrayModel';
import { FirstSportsModel } from './FirstSportsModel';
import { SecondModel } from './SecondModel';
import { ThirdModel } from './ThirdModel';

gsap.registerPlugin(ScrollTrigger);

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
      <section id="second-section" className="absolute inset-0 -z-10 h-screen">
        <View className="h-dvh w-dvw">
          <SecondModel shirtType={shirtType} />
        </View>
      </section>
      <section id="third-section" className="h-screen">
        <View className="h-dvh w-dvw">
          <ThirdModel shirtType={shirtType} />
        </View>
      </section>
    </main>
  );
};

export default Scene;
