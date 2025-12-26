/**
 * Spline 3D Scene URLs
 *
 * 각 캐릭터를 Spline에서 제작 후, Export → Code → React 선택하여
 * Public URL을 여기에 추가하세요.
 *
 * 예시: 'https://prod.spline.design/abc123xyz/scene.splinecode'
 */

export const splineScenes = {
  lamb: '', // 루루 (양) - 첫 번째로 제작할 캐릭터
  lion: '', // 아리 (사자)
  squirrel: '', // 포코 (다람쥐)
  bear: '', // 코코 (곰)
  dove: '', // 평화의 비둘기
};

export type CharacterId = keyof typeof splineScenes;

/**
 * 캐릭터 ID로 Spline Scene URL 가져오기
 */
export function getCharacterScene(characterId: string): string {
  return splineScenes[characterId as CharacterId] || '';
}

/**
 * Spline Scene이 준비되었는지 확인
 */
export function isSceneReady(characterId: string): boolean {
  return getCharacterScene(characterId) !== '';
}

/**
 * 준비된 캐릭터 목록 가져오기
 */
export function getReadyCharacters(): CharacterId[] {
  return Object.entries(splineScenes)
    .filter(([_, url]) => url !== '')
    .map(([id]) => id as CharacterId);
}

/**
 * 아직 제작 중인 캐릭터 목록 가져오기
 */
export function getPendingCharacters(): CharacterId[] {
  return Object.entries(splineScenes)
    .filter(([_, url]) => url === '')
    .map(([id]) => id as CharacterId);
}
