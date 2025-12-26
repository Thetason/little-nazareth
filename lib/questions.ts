export interface Question {
  id: number;
  type: 'choice' | 'carousel';
  question: string;
  description?: string;
  choices: {
    label: string;
    value: string;
    image?: string;
    emoji?: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'choice',
    question: '달 혹은 별',
    description: '둘 중 하나를 선택하세요',
    choices: [
      { label: '달', value: 'moon', emoji: '🌙' },
      { label: '별', value: 'stars', emoji: '⭐' },
    ]
  },
  {
    id: 2,
    type: 'choice',
    question: '기도는 언제 가장 간절한가요?',
    choices: [
      { label: '새벽, 고요한 순간', value: 'dawn', emoji: '🌅' },
      { label: '밤, 하루를 정리하며', value: 'night', emoji: '🌙' },
      { label: '힘들 때, 즉시', value: 'struggle', emoji: '🙏' },
      { label: '감사할 때, 자연스럽게', value: 'gratitude', emoji: '✨' },
    ]
  },
  {
    id: 3,
    type: 'carousel',
    question: '4개의 상자가 놓여 있습니다. 어느 것을 열어보시겠습니까?',
    choices: [
      { label: '반짝이는 검은 상자', value: 'black', emoji: '⬜' },
      { label: '따뜻한 나무 상자', value: 'wood', emoji: '🟫' },
      { label: '빛나는 금색 상자', value: 'gold', emoji: '🟨' },
      { label: '차분한 흰색 상자', value: 'white', emoji: '⬜' },
    ]
  },
  {
    id: 4,
    type: 'choice',
    question: '힘든 일이 생겼을 때 먼저 하는 행동은?',
    choices: [
      { label: '혼자 기도하며 생각 정리', value: 'pray_alone', emoji: '🕊️' },
      { label: '믿는 사람에게 이야기', value: 'talk', emoji: '💬' },
      { label: '성경 구절 찾아보기', value: 'bible', emoji: '📖' },
      { label: '조용히 자연 속 산책', value: 'nature', emoji: '🌿' },
    ]
  },
  {
    id: 5,
    type: 'choice',
    question: '사람들과 함께 있을 때 나는...',
    choices: [
      { label: '다른 사람을 먼저 돌봐요', value: 'caring', emoji: '🤗' },
      { label: '조용히 듣고 관찰해요', value: 'listening', emoji: '👂' },
      { label: '분위기를 밝게 만들어요', value: 'cheerful', emoji: '😊' },
      { label: '깊은 대화를 나눠요', value: 'deep_talk', emoji: '💭' },
    ]
  },
];

// 결과 매칭 로직
export function getCharacterFromAnswers(answers: Record<number, string>): string {
  // 간단한 점수 기반 시스템
  const scores = {
    lamb: 0,    // 양 - 온화함, 순수
    lion: 0,    // 사자 - 용기, 리더십
    dove: 0,    // 비둘기 - 평화, 경청
    deer: 0,    // 사슴 - 지혜, 자연
  };

  // 각 답변에 따라 점수 부여 (예시)
  if (answers[1] === 'moon') scores.dove += 2;
  if (answers[1] === 'stars') scores.lion += 2;

  if (answers[2] === 'dawn') scores.deer += 3;
  if (answers[2] === 'night') scores.dove += 3;
  if (answers[2] === 'struggle') scores.lamb += 3;
  if (answers[2] === 'gratitude') scores.lion += 3;

  if (answers[4] === 'pray_alone') scores.dove += 2;
  if (answers[4] === 'talk') scores.lamb += 2;
  if (answers[4] === 'bible') scores.deer += 2;
  if (answers[4] === 'nature') scores.deer += 2;

  if (answers[5] === 'caring') scores.lamb += 3;
  if (answers[5] === 'listening') scores.dove += 3;
  if (answers[5] === 'cheerful') scores.lion += 3;
  if (answers[5] === 'deep_talk') scores.deer += 3;

  // 가장 높은 점수의 캐릭터 반환
  const maxScore = Math.max(...Object.values(scores));
  const character = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'lamb';

  return character;
}
