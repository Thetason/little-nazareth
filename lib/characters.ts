// 리틀 나사렛의 서툰 룸메이트들
// Little Nazareth's Clumsy Roommates

export interface Character {
  id: string;
  name: string;
  koreanName: string;
  englishName: string;
  animal: string;
  emoji: string;
  nickname: string;
  color: string;
  tagline: string;
  description: string;
  story: string;
  personality: string[];
  symbolItem?: string;
  trait: string;
  comfortMessage: string;
}

export const characters: Character[] = [
  {
    id: "lamb",
    name: "램비",
    koreanName: "램비",
    englishName: "Lambie",
    animal: "양",
    emoji: "🐑",
    nickname: "수도꼭지 울보",
    color: "#FFB3BA",
    tagline: "우리... 같이 울자...!",
    description: "슬픈 이야기를 들으면 금세 눈가가 촉촉해져서 털이 젖어버리는 울보",
    story: `램비는 별명이 수도꼭지예요.
슬픈 이야기를 들으면, 금세 눈가가 촉촉해져서 털이 젖어버리거든요. 사람들은 '뚝! 울지 마'라고 하지만, 램비는 훌쩍거리며 이렇게 말해요.

'우리... 같이 울자…!'

램비의 축축하게 젖은 볼을 닦아주다 보면,
당신도 모르게 꾹 참았던 마음이 터져 나올지도 몰라요.
실컷 울어도 괜찮아요.
램비가 당신의 눈물을 다 가져가 줄 테니까요.`,
    personality: ["감성적", "공감 능력", "순수함", "눈물샘"],
    symbolItem: "축축한 털",
    trait: "예수님의 어린 양, 착하고 순수한 성격",
    comfortMessage: "실컷 울어도 괜찮아요. 램비가 당신의 눈물을 다 가져가 줄 테니까요.",
  },
  {
    id: "lion",
    name: "아리",
    koreanName: "아리",
    englishName: "Ari",
    animal: "사자",
    emoji: "🦁",
    nickname: "딸꾹질쟁이 꼬마 대장",
    color: "#FFA552",
    tagline: "히끅! 내가 지켜줄게. 그러니까 걱정 마!",
    description: "으르렁 대신 딸꾹질이 나오는 왕껌딱지 사자",
    story: `아리는 사실... '으르렁!'을 잘 못해요.

멋지게 소리치려다가도 긴장해서 '히끅!' 하고 딸꾹질이 튀어나오거든요. 겉모습은 용감한 사자 같지만, 사실 혼자가 무서워 친구들 옆에 꼭 붙어있는 '왕껌딱지'랍니다.
(코코의 옷자락이 늘어난 건, 아마 아리가 무서워서 꽉 잡고 다녔기 때문일 거예요.)

하지만 당신이 불안해하는 밤이면,
아리는 그 누구보다 빠르게 달려와 두 팔을 벌립니다.
'히끅! 내가 지켜줄게. 그러니까 걱정 마!'`,
    personality: ["용감한 척", "겁쟁이", "리더십", "껌딱지"],
    symbolItem: "코코의 늘어난 옷자락",
    trait: "유다의 사자, 리더십 있지만 친근한 성격",
    comfortMessage: "히끅! 내가 지켜줄게. 그러니까 걱정 마!",
  },
  {
    id: "squirrel",
    name: "다비",
    koreanName: "다비",
    englishName: "Davi",
    animal: "다람쥐",
    emoji: "🐿️",
    nickname: "조약돌 수집가",
    color: "#D4A574",
    tagline: "으악! 무서워.. 그래도 하나 주웠다!",
    description: "도토리 대신 용기의 조약돌을 입안 가득 물고 다니는 겁쟁이",
    story: `다비의 볼이 왜 항상 빵빵한지 아세요?
맛있는 도토리 대신 <용기의 조약돌>을
입안 가득 물고 있거든요.

사실 다비는 엄청난 겁쟁이 입니다.
돌맹이 밑에 지렁이가 꿈틀거릴까 봐
손에 땀을 쥐면서도 돌을 줍곤 하죠.

'으악! 무서워.. 그래도 하나 주웠다!'

다비가 건네는 따뜻한 조약돌을 쥐어보세요.

대단한 게 아니면 좀 어때요?
덜덜 떨면서도 결국 오늘은 버텨낸 당신처럼,
아주 단단한 용기인걸요.`,
    personality: ["겁쟁이", "용기", "수집가", "끈기"],
    symbolItem: "용기의 조약돌",
    trait: "활발하고 에너지 넘치지만 겁이 많은 성격",
    comfortMessage: "덜덜 떨면서도 결국 오늘은 버텨낸 당신처럼, 아주 단단한 용기인걸요.",
  },
  {
    id: "bear",
    name: "코코",
    koreanName: "코코",
    englishName: "Coco",
    animal: "곰",
    emoji: "🐻",
    nickname: "꾸벅꾸벅 코코아 찐빵곰",
    color: "#8B6F47",
    tagline: "아무것도 하지 않아도 괜찮아",
    description: "기도하다 잠들고, 초콜릿 향 담요를 끌고 다니는 포근한 곰",
    story: `코코는 기도를 하다가도 '아멘' 하기도 전에 잠이 들어버려요.

늘 질질 끌고 다니는 애착 담요에선
달콤한 초콜릿 향기가 나죠.

코코는 아무것도 하지 않아도, 1등 하지 않아도 괜찮다고 온몸으로 말해주는 친구예요. 지친 하루 끝에 코코가 다가오면, 그 포근한 담요 속으로 쏙 들어가 보세요.

세상에서 제일 작고 따뜻한 등 뒤에서,
오늘 밤은 아무 걱정 없이 꿀잠을 자게 될 거예요.`,
    personality: ["졸음", "포근함", "무조건적 수용", "평온"],
    symbolItem: "초콜릿 향 담요",
    trait: "따뜻하고 포근한 성격, 보호자 역할",
    comfortMessage: "아무것도 하지 않아도, 1등 하지 않아도 괜찮아요.",
  },
  {
    id: "deer",
    name: "디올",
    koreanName: "디올",
    englishName: "Dior",
    animal: "사슴",
    emoji: "🦌",
    nickname: "미완성",
    color: "#C9A96E",
    tagline: "아직 완성되지 않은 이야기",
    description: "아직 캐릭터 설정이 완성되지 않았어요",
    story: `디올의 이야기는 아직 완성되지 않았어요.
하지만 곧 당신을 만나러 올 거예요.`,
    personality: ["우아함", "지혜", "조언자"],
    symbolItem: "",
    trait: "은혜롭고 우아한 성격, 조언자 역할",
    comfortMessage: "",
  },
];

// 캐릭터 검색 헬퍼 함수
export const getCharacterById = (id: string): Character | undefined => {
  return characters.find((char) => char.id === id);
};

export const getCharacterByName = (name: string): Character | undefined => {
  return characters.find(
    (char) =>
      char.name === name ||
      char.koreanName === name ||
      char.englishName === name
  );
};

// 전체 캐릭터 개요
export const characterConcept = {
  title: "리틀 나사렛의 서툰 룸메이트들",
  subtitle: "Little Nazareth's Clumsy Roommates",
  description:
    "완벽하지 않아도 괜찮아요. 서툴러도 괜찮아요. 우리는 함께니까요.",
  theme: "불완전함 속의 위로와 따뜻함",
};
