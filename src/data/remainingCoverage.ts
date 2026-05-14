import type {
  BodyPartKey,
  FastFinishPath,
  LeftRightGuide,
  LocalizedStringArray,
  LocalizedText,
  MicroDetail,
  MicroDetailSystem,
  QualityCheckItem,
  TechniqueQualityChecklist,
} from '../types/skill'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })
const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({ vi, en, fr })

const mkDetail = (
  id: string,
  category: MicroDetail['category'],
  title: string,
  instruction: string,
  when: string,
  why: string,
  mistake: string,
  cue: string,
  live: string,
  side: MicroDetail['side'] = 'both',
  direction: MicroDetail['direction'] = 'close_in',
  bodyParts: string[] = ['hands', 'hips'],
  safety?: string,
): MicroDetail => ({
  id,
  category,
  title: lt(title, title, title),
  shortInstruction: lt(instruction, instruction, instruction),
  side,
  direction,
  bodyParts,
  whenToUse: lt(when, when, when),
  whyItWorks: lt(why, why, why),
  commonMistake: lt(mistake, mistake, mistake),
  correctionCue: lt(cue, cue, cue),
  liveCue: lt(live, live, live),
  safetyNote: safety ? lt(safety, safety, safety) : undefined,
})

const mkGuide = (id: string, scenario: string, leftHand: string, rightHand: string, leftLeg: string, rightLeg: string, head: string, hips: string, note: string): LeftRightGuide => ({
  id,
  scenario: lt(scenario, scenario, scenario),
  leftHand: lt(leftHand, leftHand, leftHand),
  rightHand: lt(rightHand, rightHand, rightHand),
  leftLeg: lt(leftLeg, leftLeg, leftLeg),
  rightLeg: lt(rightLeg, rightLeg, rightLeg),
  head: lt(head, head, head),
  hips: lt(hips, hips, hips),
  note: lt(note, note, note),
})

const mkPath = (id: string, title: string, steps: Array<[string, string, string]>, finish: string, abort: string, next: string, safety?: string): FastFinishPath => ({
  id,
  title: lt(title, title, title),
  steps: steps.map(([instruction, bodyPart, commonMistake], index) => ({
    id: `${id}-${index + 1}`,
    order: index + 1,
    instruction: lt(instruction, instruction, instruction),
    keyBodyPart: bodyPart,
    commonMistake: lt(commonMistake, commonMistake, commonMistake),
  })),
  finishTrigger: lt(finish, finish, finish),
  abortSignal: lt(abort, abort, abort),
  nextBestOption: lt(next, next, next),
  safetyNote: safety ? lt(safety, safety, safety) : undefined,
})

const mkCheck = (
  id: string,
  title: string,
  question: string,
  success: string,
  failure: string,
  fix: string,
  bodyParts: BodyPartKey[],
  severity: QualityCheckItem['severity'],
  relatedMicroDetailIds: string[] = [],
): QualityCheckItem => ({
  id,
  title: lt(title, title, title),
  question: lt(question, question, question),
  successSignal: lt(success, success, success),
  failureSignal: lt(failure, failure, failure),
  quickFix: lt(fix, fix, fix),
  bodyParts,
  severity,
  relatedMicroDetailIds,
})

const makeSystem = (id: string, title: string, overview: string, kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety'): MicroDetailSystem => {
  if (id === 'competition-ruleset-awareness') {
    const rDetail = (
      detailId: string,
      category: MicroDetail['category'],
      titleText: LocalizedText,
      instruction: LocalizedText,
      when: LocalizedText,
      why: LocalizedText,
      mistake: LocalizedText,
      cue: LocalizedText,
      live: LocalizedText,
      bodyParts: string[],
      safetyNote?: LocalizedText,
    ): MicroDetail => ({
      id: detailId,
      category,
      title: titleText,
      shortInstruction: instruction,
      side: 'both',
      direction: 'close_in',
      bodyParts,
      whenToUse: when,
      whyItWorks: why,
      commonMistake: mistake,
      correctionCue: cue,
      liveCue: live,
      safetyNote,
    })

    const rulesetPath: FastFinishPath = {
      id: 'competition-ruleset-awareness-fast',
      title: lt('Đường quyết định theo luật', 'Ruleset decision path', 'Chemin de décision règlement'),
      steps: [
        {
          id: 'competition-ruleset-awareness-fast-1',
          order: 1,
          instruction: lt('Xác nhận kỹ thuật nào hợp lệ trong bracket này.', 'Confirm what is legal in this bracket.', 'Confirmez ce qui est légal dans ce bracket.'),
          keyBodyPart: 'head',
          commonMistake: lt('Bạn nghĩ mọi ruleset giống nhau.', 'You assume every ruleset is the same.', 'Vous supposez que tous les règlements sont identiques.'),
        },
        {
          id: 'competition-ruleset-awareness-fast-2',
          order: 2,
          instruction: lt('Đọc điểm số, advantage và penalty.', 'Check score, advantages, and penalties.', 'Vérifiez score, avantages et pénalités.'),
          keyBodyPart: 'head',
          commonMistake: lt('Bạn tấn công mà không biết mình cần gì.', 'You attack without knowing what you need.', 'Vous attaquez sans savoir ce qu’il faut.'),
        },
        {
          id: 'competition-ruleset-awareness-fast-3',
          order: 3,
          instruction: lt('Đọc đồng hồ và luật overtime.', 'Check clock and overtime rule.', 'Vérifiez le chrono et la règle overtime.'),
          keyBodyPart: 'hands',
          commonMistake: lt('Bạn chọn setup chậm khi không còn thời gian.', 'You choose a slow setup with no time left.', 'Vous choisissez un setup lent sans temps.'),
        },
        {
          id: 'competition-ruleset-awareness-fast-4',
          order: 4,
          instruction: lt('Chọn hành động low, medium hoặc high risk.', 'Choose low, medium, or high-risk action.', 'Choisissez une action low, medium ou high risk.'),
          keyBodyPart: 'hips',
          commonMistake: lt('Risk không khớp trạng thái trận.', 'Risk does not match the match state.', 'Le risque ne correspond pas à l’état du match.'),
        },
        {
          id: 'competition-ruleset-awareness-fast-5',
          order: 5,
          instruction: lt('Reset nếu có nguy cơ penalty hoặc illegal action.', 'Reset if penalty or illegal-action risk appears.', 'Reset si risque de pénalité ou action illégale apparaît.'),
          keyBodyPart: 'feet',
          commonMistake: lt('Bạn tiếp tục sau tín hiệu cảnh báo.', 'You continue after the warning signal.', 'Vous continuez après le signal d’alerte.'),
        },
      ],
      finishTrigger: lt('Exchange tiếp theo khớp luật, điểm, đồng hồ và risk.', 'The next exchange matches law, score, clock, and risk.', 'Le prochain échange correspond aux règles, score, chrono et risque.'),
      abortSignal: lt('Bạn không chắc luật hoặc không biết mình cần điểm gì.', 'You are unsure what is legal or what score you need.', 'Vous n’êtes pas sûr de la règle ou du score nécessaire.'),
      nextBestOption: lt('Tạm dừng, hỏi HLV/trọng tài khi có thể, rồi chọn nhánh an toàn hơn.', 'Pause, ask coach/referee when possible, and choose a safer branch.', 'Pause, demandez au coach/arbitre si possible, puis choisissez une branche plus sûre.'),
      safetyNote: lt('Không dùng leg lock, slam, neck crank hoặc reaping entry bị cấm bởi ruleset.', 'Do not use leg locks, slams, neck cranks, or reaping entries banned by the ruleset.', 'N’utilisez pas leg locks, slams, neck cranks ou reaping interdits par le règlement.'),
    }

    return {
      overview: lt(
        'Nhận thức luật thi đấu là checklist chiến thuật trước và trong trận: luật nào hợp lệ, điểm số đang ra sao, còn bao nhiêu thời gian, và rủi ro penalty là gì.',
        'Ruleset awareness is a tactical checklist before and during a match: what is legal, what the score is, how much time is left, and where penalty risk lives.',
        'La conscience du règlement est une checklist tactique avant et pendant le match : ce qui est légal, le score, le temps restant et le risque de pénalité.',
      ),
      topFiveDetails: [
        rDetail('competition-ruleset-awareness-legality', 'safety', lt('Luật hợp lệ', 'Legal actions', 'Actions légales'), lt('Trước giải, kiểm tra guard pull, heel hook, reaping, slams, neck cranks và scoring theo đúng ruleset.', 'Before competing, confirm guard pulling, heel hooks, reaping, slams, neck cranks, and scoring for the exact ruleset.', 'Avant compétition, confirmez guard pull, heel hooks, reaping, slams, neck cranks et scoring selon le règlement exact.'), lt('Trước khi chọn game plan hoặc vào bracket', 'Before choosing a game plan or entering the bracket', 'Avant de choisir le game plan ou d’entrer dans le bracket'), lt('Một kỹ thuật tốt vẫn có thể là lựa chọn tệ nếu ruleset cấm hoặc phạt cách vào đòn.', 'A good technique can still be a bad choice if the ruleset bans or penalizes the entry.', 'Une bonne technique peut être un mauvais choix si le règlement interdit ou pénalise l’entrée.'), lt('Bạn dùng thói quen từ ruleset khác mà không kiểm tra luật hiện tại.', 'You use habits from another ruleset without checking the current one.', 'Vous utilisez des habitudes d’un autre règlement sans vérifier celui-ci.'), lt('Luật trước, kỹ thuật sau.', 'Rules first, technique second.', 'Règles d’abord, technique ensuite.'), lt('Luật trước.', 'Rules first.', 'Règles d’abord.'), ['head', 'hands'], lt('Nếu không chắc luật leg lock hoặc neck attack, hỏi trọng tài/HLV trước khi thi đấu.', 'If leg-lock or neck-attack rules are unclear, ask the referee or coach before competing.', 'Si les règles leg lock ou attaques cervicales sont floues, demandez à l’arbitre ou au coach avant de combattre.')),
        rDetail('competition-ruleset-awareness-score', 'timing', lt('Điểm số và advantage', 'Score and advantages', 'Score et avantages'), lt('Đọc mình đang thắng, hòa hay thua để chọn giữ vị trí, sweep, pass, submit hoặc risk scramble.', 'Know whether you are winning, tied, or losing before choosing hold, sweep, pass, submission, or scramble risk.', 'Sachez si vous menez, êtes à égalité ou perdez avant de choisir contrôle, sweep, passage, soumission ou scramble risqué.'), lt('Giữa trận và cuối trận', 'Mid-match and late match', 'Milieu et fin de match'), lt('Score thay đổi giá trị của mỗi exchange: cùng một pha guard pull có thể đúng hoặc sai tùy điểm.', 'Score changes the value of each exchange: the same guard pull can be right or wrong depending on the scoreboard.', 'Le score change la valeur de chaque échange : le même guard pull peut être bon ou mauvais selon le score.'), lt('Bạn tấn công như đang hòa dù đang dẫn hoặc cần điểm.', 'You attack as if tied when you are leading or when you need points.', 'Vous attaquez comme à égalité alors que vous menez ou avez besoin de points.'), lt('Score quyết định risk.', 'Score decides risk.', 'Le score décide le risque.'), lt('Đọc điểm.', 'Read the score.', 'Lisez le score.'), ['head', 'hips']),
        rDetail('competition-ruleset-awareness-clock', 'timing', lt('Đồng hồ trận', 'Match clock', 'Chrono du match'), lt('Khi còn ít thời gian, ưu tiên hành động tạo điểm rõ hoặc giữ control thay vì setup dài.', 'When time is short, prioritize clear scoring actions or secure control over long setups.', 'Quand le temps manque, privilégiez les actions qui scorent clairement ou le contrôle sûr plutôt que les longs setups.'), lt('Một đến hai phút cuối hoặc overtime', 'Last one to two minutes or overtime', 'Dernière une à deux minutes ou overtime'), lt('Thời gian ngắn làm giảm giá trị của setup chậm và tăng giá trị của control chắc.', 'Short time lowers the value of slow setups and raises the value of stable control.', 'Le temps court réduit la valeur des setups lents et augmente celle du contrôle stable.'), lt('Bạn chọn chuỗi quá dài khi cần điểm ngay.', 'You choose a long chain when you need points now.', 'Vous choisissez une chaîne trop longue quand il faut scorer maintenant.'), lt('Đồng hồ đổi chiến thuật.', 'The clock changes tactics.', 'Le chrono change la tactique.'), lt('Nhìn giờ.', 'Check time.', 'Regardez le chrono.'), ['head', 'hands']),
        rDetail('competition-ruleset-awareness-penalty', 'safety', lt('Rủi ro penalty', 'Penalty risk', 'Risque de pénalité'), lt('Nhận biết passivity, stalling, illegal grip/pressure, out-of-bounds và hành vi có thể bị warning.', 'Recognize passivity, stalling, illegal grips or pressure, out-of-bounds patterns, and warning risk.', 'Reconnaissez passivité, stalling, grips ou pressions illégales, sorties de zone et risque d’avertissement.'), lt('Khi trận bị dừng nhịp hoặc trọng tài nhắc', 'When the match rhythm stalls or the referee warns', 'Quand le rythme se bloque ou que l’arbitre avertit'), lt('Penalty có thể đảo trận dù bạn không bị submit hay mất vị trí.', 'Penalties can flip a match even without a submission or position loss.', 'Les pénalités peuvent retourner un match sans soumission ni perte de position.'), lt('Bạn để trọng tài quyết định trận vì không điều chỉnh nhịp.', 'You let the referee decide the match because you do not adjust pace.', 'Vous laissez l’arbitre décider le match faute d’ajuster le rythme.'), lt('Tránh thắng kỹ thuật nhưng thua luật.', 'Do not win technically but lose by rules.', 'Ne gagnez pas techniquement pour perdre au règlement.'), lt('Tránh penalty.', 'Avoid penalties.', 'Évitez les pénalités.'), ['hands', 'feet']),
        rDetail('competition-ruleset-awareness-gameplan', 'timing', lt('Game plan theo luật', 'Ruleset game plan', 'Game plan selon règlement'), lt('Chọn A-game phù hợp: points game, sub-only, ADCC-style wrestling, IBJJF-style safety hoặc gym round.', 'Choose the right A-game: points game, sub-only, ADCC-style wrestling, IBJJF-style safety, or gym round.', 'Choisissez le bon A-game : points, sub-only, wrestling style ADCC, sécurité style IBJJF ou round au gym.'), lt('Trước trận và giữa các trận', 'Before the match and between matches', 'Avant le match et entre les matchs'), lt('Ruleset tốt cho game nào thì nên ưu tiên entry, pace và risk profile của game đó.', 'The ruleset rewards certain games, so entry, pace, and risk profile should match it.', 'Le règlement récompense certains games : entrée, rythme et profil de risque doivent suivre.'), lt('Bạn dùng cùng một game plan cho mọi giải.', 'You use the same game plan for every event.', 'Vous utilisez le même game plan pour chaque tournoi.'), lt('Game plan theo luật.', 'Game plan follows rules.', 'Game plan selon règles.'), lt('Chọn luật.', 'Choose by rules.', 'Choisir par règles.'), ['hips', 'knees']),
      ],
      leftRightGuides: [
        mkGuide('competition-ruleset-awareness-leading', 'When leading on points', 'Control grips and slow risk.', 'Post or frame to prevent reversal.', 'Keep base.', 'Do not overcommit.', 'Head stays safe and calm.', 'Hips stay heavy.', 'Protect the lead before chasing low-percentage submissions.'),
        mkGuide('competition-ruleset-awareness-trailing', 'When trailing on points', 'Create grips that force movement.', 'Open the scoring or submission lane.', 'Step or hook to create angle.', 'Drive the re-attack.', 'Head pressures toward action.', 'Hips move first.', 'Increase urgency without ignoring legal and safety lines.'),
      ],
      fastFinishPaths: [rulesetPath],
      troubleshootingTips: [
        { problem: lt('Bạn không biết mình cần điểm, advantage hay submission.', 'You do not know whether you need points, advantage, or submission.', 'Vous ne savez pas si vous avez besoin de points, avantage ou soumission.'), quickFix: lt('Nhìn bảng điểm trước khi chọn nhánh tiếp theo.', 'Check the scoreboard before choosing the next branch.', 'Regardez le score avant de choisir la prochaine branche.'), cue: lt('Score trước.', 'Score first.', 'Score d’abord.') },
        { problem: lt('Bạn dùng entry leg lock không chắc có hợp lệ không.', 'You use a leg-lock entry without knowing if it is legal.', 'Vous utilisez une entrée leg lock sans savoir si elle est légale.'), quickFix: lt('Chuyển sang control/sweep hợp lệ nếu chưa chắc luật.', 'Switch to legal control or sweep if the rule is unclear.', 'Passez à un contrôle ou sweep légal si la règle est floue.'), cue: lt('Không chắc thì đừng xoắn.', 'If unsure, do not rotate.', 'Si doute, ne tournez pas.') },
        { problem: lt('Bạn đang dẫn điểm nhưng vẫn chase submission rủi ro.', 'You are leading but still chasing a risky submission.', 'Vous menez mais chassez une soumission risquée.'), quickFix: lt('Ổn định position trước, chỉ tấn công khi control không mất.', 'Settle position first; attack only when control stays.', 'Stabilisez d’abord; attaquez seulement si le contrôle reste.'), cue: lt('Dẫn điểm thì giữ control.', 'Lead means control.', 'Avance = contrôle.') },
      ],
      doNotDo: la(
        ['Đừng dùng luật của giải này cho giải khác.', 'Đừng vào leg lock khi chưa rõ legality.', 'Đừng quên score và đồng hồ.', 'Đừng chase submission rủi ro khi đang dẫn chắc.', 'Đừng để penalty quyết định trận.'],
        ['Do not use one ruleset as if it applied everywhere.', 'Do not enter leg locks without knowing legality.', 'Do not forget score and clock.', 'Do not chase risky submissions when safely leading.', 'Do not let penalties decide the match.'],
        ['N’utilisez pas un règlement comme s’il valait partout.', 'N’entrez pas en leg lock sans connaître la légalité.', 'N’oubliez pas score et chrono.', 'Ne chassez pas une soumission risquée en menant.', 'Ne laissez pas les pénalités décider du match.'],
      ),
      safetyNotes: la(
        ['Luôn hỏi luật leg lock, reaping, slam và neck crank trước giải.', 'Nếu luật không rõ, chọn nhánh control an toàn hơn.', 'Ở gym, thống nhất ruleset trước round.'],
        ['Always confirm leg-lock, reaping, slam, and neck-crank rules before competing.', 'If the rule is unclear, choose the safer control branch.', 'In the gym, agree on the ruleset before the round.'],
        ['Confirmez toujours les règles leg lock, reaping, slam et neck crank avant compétition.', 'Si la règle est floue, choisissez la branche de contrôle plus sûre.', 'Au gym, fixez le ruleset avant le round.'],
      ),
    }
  }
  const titleViMap: Record<string, string> = {
    'positional-hierarchy': 'Thứ bậc vị trí',
    'inside-position': 'Đường trong',
    'frames-pummeling': 'Frame và pummel',
    'dilemmas-two-way-attacks': 'Dilemma và tấn công hai hướng',
    'failure-response-transitions': 'Phản ứng khi lỗi và chuyển nhánh',
    'back-survival': 'Sống sót ở back',
    'leg-lock-safety-basics': 'An toàn leg lock cơ bản',
    'seated-guard-retention': 'Giữ guard ngồi',
    'supine-guard-retention': 'Giữ guard nằm ngửa',
    'half-guard-knee-shield': 'Half guard knee shield',
    'half-guard-wrestle-up': 'Half guard wrestle-up',
    'shin-to-shin-entry': 'Vào đòn từ shin-to-shin',
    'single-leg-x-basics': 'Single-leg X cơ bản',
    'k-guard-entry': 'Vào K-guard',
    'butterfly-guard-off-balance': 'Butterfly off-balance',
    'technical-stand-up': 'Đứng kỹ thuật',
    'hand-fighting': 'Hand fighting',
    'snapdown-front-headlock': 'Snapdown vào front headlock',
    'single-leg-bjj': 'Single-leg cho BJJ',
    'sprawl-go-behind': 'Sprawl và go-behind',
    'competition-ruleset-awareness': 'Nhận thức luật thi đấu',
    'guard-pulling-strategy': 'Chiến lược kéo guard',
    'scramble-control': 'Kiểm soát scramble',
  }
  const titleVi = titleViMap[id] ?? title
  const titleLower = title.toLowerCase()
  const overviewVi = `Hệ thống ${titleVi} tập trung vào kiểm soát vị trí, giữ đường an toàn và chuyển nhánh đúng thời điểm.`
  return {
    overview: lt(overviewVi, overview, overview),
    topFiveDetails: [
      mkDetail(`${id}-entry`, 'grip', `${titleVi}: điểm chạm mở đòn`, `Tay, đầu hoặc hông của tôi phải thắng điểm kiểm soát đầu tiên trước khi tăng lực.`, `Khi bắt đầu pha trao đổi`, `Điểm chạm cơ thể đầu tiên quyết định ${titleLower} có vào đúng đường hay không.`, `Bạn tăng lực khi chưa gắn được điểm chạm chính.`, `Điểm chạm trước, lực sau.`, 'Ưu tiên điểm chạm.', 'both', 'close_in', ['hands', 'head', 'hips']),
      mkDetail(`${id}-head`, 'head', `${titleVi}: vị trí đầu`, `Đầu của tôi phải ở phía an toàn hoặc phía trong để đối thủ không điều khiển được trục cột sống.`, `Khi cần giữ posture hoặc góc`, `Vị trí đầu quyết định hướng lực, posture và an toàn cổ.`, `Đầu trôi ra ngoài đường an toàn.`, 'Giữ đầu ở phía an toàn.', 'Đầu an toàn.', 'inside', 'pin_in', ['head', 'shoulders', 'ears']),
      mkDetail(`${id}-hands`, 'hand', `${titleVi}: đường tay`, `Tay của tôi phải dọn cổ tay, grip hoặc frame của đối thủ trước khi ép pha kế tiếp.`, `Khi đối thủ có thể hand-fight`, `Tay quyết định đường vào còn mở hay đã bị khóa lại.`, `Bạn bỏ qua cổ tay hoặc frame đang chặn đường vào.`, 'Dọn đường tay trước.', 'Tay đã clear.', 'both', 'pin_in', ['hands', 'wrists', 'forearms']),
      mkDetail(`${id}-lower`, kind === 'safety' ? 'safety' : 'hip', `${titleVi}: đường hông và gối`, `Hông, gối hoặc bàn chân của tôi phải giữ góc để thân trên không làm việc một mình.`, `Khi kết nối thân dưới là yếu tố chính`, `Căn chỉnh thân dưới đúng giúp điểm chạm vẫn hiệu quả dưới áp lực kháng lực.`, `Hông bị nổi hoặc gối trôi khỏi đường lực.`, 'Hông nằm dưới đường lực.', 'Hông ở dưới.', 'both', 'drive_diagonal', ['hips', 'knees', 'feet']),
      mkDetail(`${id}-branch`, 'timing', `${titleVi}: chuyển nhánh`, `Nếu đường đầu tiên bị chặn, tôi đổi góc trước khi ép lại cùng một hướng lực.`, `Khi đường đầu tiên bị từ chối`, `Đổi góc đúng lúc giúp hệ thống tiếp tục chạy mà không mất vị trí.`, `Bạn cố ép một đường đến khi cấu trúc bị gãy.`, 'Đổi góc rồi chuyển nhánh.', 'Góc trước.', 'both', 'open_out', ['hands', 'hips', 'head']),
    ],
    leftRightGuides: [
      mkGuide(`${id}-lr1`, `Right-side ${title} work`, 'Left hand covers or posts.', 'Right hand does the main job.', 'Left leg keeps base.', 'Right leg drives the line.', 'Head stays glued to the near side.', 'Hips stay heavy and angled.', 'One side protects, the other side attacks.'),
      mkGuide(`${id}-lr2`, `Left-side ${title} work`, 'Left hand does the main job.', 'Right hand covers or posts.', 'Left leg drives the line.', 'Right leg keeps base.', 'Head stays on the safe side.', 'Hips stay connected and low.', 'Swap roles, keep the same structure.'),
    ],
    fastFinishPaths: [mkPath(
      `${id}-fast`,
      kind === 'escape' ? `${title} fast escape path` : `${title} fast path`,
      [
        [`Attach the first body line for ${titleLower}.`, 'hands', 'You start before the body line is attached.'],
        ['Set the head and hips.', 'head', 'Head drifts and the line breaks.'],
        ['Control hands, hooks, or frames.', 'hands', 'Hands are ignored.'],
        [kind === 'escape' ? 'Recover space and inside position.' : kind === 'guard' ? 'Keep the guard layer alive.' : kind === 'wrestling' ? 'Use the off-balance or shot.' : 'Angle for control or finish.', kind === 'control' ? 'hips' : 'knees', 'You stay square.'],
        [kind === 'escape' ? 'Branch to guard or turtle.' : kind === 'guard' ? 'Recover the next layer.' : kind === 'wrestling' ? 'Finish or re-attack.' : kind === 'safety' ? 'Stop if safety is unclear.' : 'Change angle if blocked.', 'feet', 'You freeze on the first option.'],
      ],
      kind === 'escape' ? 'Space is back and you can recover.' : kind === 'safety' ? 'The line is safe enough to continue.' : 'The structure is stable enough to continue.',
      kind === 'escape' ? 'The line is still trapped.' : 'The first line is lost.',
      kind === 'escape' ? 'Recover the next layer.' : kind === 'safety' ? 'Reset and protect the line.' : 'Move to the next branch.',
      kind === 'safety' ? 'Train slowly and tap early.' : undefined,
    )],
    troubleshootingTips: [
      { problem: lt(`Bạn mất mốc kiểm soát đầu tiên trong ${titleLower}.`, `You lose the first body line on ${titleLower}.`, `Vous perdez la première ligne sur ${titleLower}.`), quickFix: lt('Gắn lại tay, đầu hoặc hông vào đúng đường lực trước khi tăng lực.', 'Reattach the hand, head, or hip line before adding force.', 'Rattachez main, tête ou hanche avant d’ajouter force.'), cue: lt('Đường lực trước.', 'Line first.', 'Ligne d’abord.') },
      { problem: lt('Đầu trôi khỏi phía an toàn.', 'Your head drifts away from the safe side.', 'Votre tête quitte le côté sûr.'), quickFix: lt('Đặt đầu lại phía trong hoặc phía an toàn.', 'Put the head back on the inside or safe side.', 'Replacez la tête inside ou côté sûr.'), cue: lt('Đầu an toàn.', 'Head safe.', 'Tête sûre.') },
      { problem: lt('Tay chưa dọn được grip/frame của đối thủ.', 'Hands have not cleared the opponent grip or frame.', 'Les mains n’ont pas libéré le grip ou frame adverse.'), quickFix: lt('Dọn cổ tay hoặc frame trước khi ép tiếp.', 'Clear the wrist or frame before forcing again.', 'Libérez poignet ou frame avant de forcer.'), cue: lt('Dọn tay trước.', 'Clear hands.', 'Mains libres.') },
      { problem: lt('Hông bị nổi hoặc base bị gãy.', 'Hips float or base breaks.', 'Les hanches flottent ou la base casse.'), quickFix: lt('Hạ hông xuống và dựng lại base.', 'Lower the hips and rebuild base.', 'Baissez les hanches et reconstruisez la base.'), cue: lt('Base trước.', 'Base first.', 'Base d’abord.') },
      { problem: lt('Đường đầu bị chặn.', 'The first lane is blocked.', 'La première ligne est bloquée.'), quickFix: lt('Đổi góc trước khi đổi nhánh.', 'Change angle before branching.', 'Changez l’angle avant la branche.'), cue: lt('Góc trước.', 'Angle first.', 'Angle d’abord.') },
    ],
    doNotDo: la(
      ['Đừng mất mốc kiểm soát đầu tiên.', 'Đừng đẩy vuông khi cần góc.', 'Đừng để đầu trôi ra ngoài.', 'Đừng quên tay phòng thủ.', 'Đừng cố một nhánh quá lâu.'],
      ['Do not lose the first body line.', 'Do not drive square when angle is needed.', 'Do not let the head drift outside.', 'Do not forget the defensive hands.', 'Do not force one branch too long.'],
      ['Ne perdez pas la première ligne.', 'Ne poussez pas carré quand l’angle est nécessaire.', 'Ne laissez pas la tête sortir.', 'N’oubliez pas les mains défensives.', 'Ne forcez pas une seule branche trop longtemps.'],
    ),
    safetyNotes: kind === 'safety' ? la(['Tap early.', 'Do not rotate blindly.', 'Train under supervision.'], ['Tap early.', 'Do not rotate blindly.', 'Train under supervision.'], ['Tapez tôt.', 'Ne tournez pas à l’aveugle.', 'Travaillez sous supervision.']) : la(['Keep the line safe.', 'Tap early when danger appears.', 'Do not force through pain.'], ['Keep the line safe.', 'Tap early when danger appears.', 'Do not force through pain.'], ['Gardez la ligne sûre.', 'Tapez tôt quand le danger apparaît.', 'Ne forcez pas à travers la douleur.']),
  }
}

const makeChecklist = (id: string, title: string, kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety', safety?: boolean): TechniqueQualityChecklist => {
  const safetyTitle = safety ? 'Safety line' : 'Safety / settle'
  const safetyQuestion = safety ? 'Is the safety line respected?' : 'Can you settle after the action?'
  const safetySuccess = safety ? 'The danger line is respected.' : 'You can settle and continue.'
  const safetyFailure = safety ? 'The line is still risky.' : 'You did not settle yet.'
  const safetyFix = safety ? 'Stop, reset, and slow down.' : 'Settle before moving on.'
  const checks: QualityCheckItem[] = [
    mkCheck(`${id}-1`, `${title} line`, `Is the first control line for ${title.toLowerCase()} present?`, 'Yes, the line is stable.', 'No, the line is open.', 'Rebuild the first line.', ['hands', 'head', 'hips'], 'critical', [`${id}-entry`]),
    mkCheck(`${id}-2`, 'Head position', 'Is the head on the safe or inside side?', 'Yes, the head helps the line.', 'No, the head floats away.', 'Put the head back on line.', ['head', 'shoulders', 'ears'], 'critical', [`${id}-head`]),
    mkCheck(`${id}-3`, kind === 'safety' ? 'Safety line' : 'Hands and grips', kind === 'safety' ? 'Is the danger line clear?' : 'Are the hands controlling the right line?', kind === 'safety' ? 'The line is safe enough to continue.' : 'The hands are controlling the exchange.', kind === 'safety' ? 'The line is still dangerous.' : 'The hands are too loose.', kind === 'safety' ? 'Stop and reset safety.' : 'Win the hands again.', ['hands', 'wrists', 'forearms'], 'critical', [`${id}-hands`]),
    mkCheck(`${id}-4`, kind === 'guard' ? 'Guard layer' : kind === 'escape' ? 'Inside position' : kind === 'wrestling' ? 'Off-balance or shot' : 'Lower body', kind === 'guard' ? 'Is the guard layer still alive?' : kind === 'escape' ? 'Have you recovered inside position?' : kind === 'wrestling' ? 'Did you create the entry or off-balance?' : 'Are the hips, knees, or feet doing the work?', kind === 'guard' ? 'The guard can still rebuild.' : kind === 'escape' ? 'You have a path back.' : kind === 'wrestling' ? 'The attack line is open.' : 'The lower body is connected.', kind === 'guard' ? 'The guard is collapsing.' : kind === 'escape' ? 'Inside position is gone.' : kind === 'wrestling' ? 'The entry is flat.' : 'The lower body is floating.', kind === 'guard' ? 'Recover the guard layer.' : kind === 'escape' ? 'Rebuild the inside layer.' : kind === 'wrestling' ? 'Change angle and re-enter.' : 'Reconnect the lower body.', ['hips', 'knees', 'feet'], 'major', [`${id}-lower`]),
    mkCheck(`${id}-5`, 'Angle and timing', 'Is the angle or timing correct for the next branch?', 'Yes, the branch is ready.', 'No, you are driving square.', 'Take angle before force.', ['hips', 'knees', 'feet'], 'major', [`${id}-branch`]),
    mkCheck(`${id}-6`, safetyTitle, safetyQuestion, safetySuccess, safetyFailure, safetyFix, ['hands', 'head', 'hips'], 'major', [`${id}-branch`]),
  ]
  return buildChecklist(kind === 'safety' ? 'safety' : kind === 'guard' ? 'guard' : kind === 'escape' ? 'escape' : kind === 'wrestling' ? 'wrestling' : 'control', lt(`Kiểm ${title.toLowerCase()} và các đường kiểm soát chính.`, `Check ${title.toLowerCase()} and the main lines.`, `Vérifiez ${title.toLowerCase()} et les lignes principales.`), checks, 70, lt('Checklist đủ tốt để tiếp tục.', 'Checklist is good enough to continue.', 'La checklist est assez bonne pour continuer.'), lt('Sửa đường đầu tiên đang gãy.', 'Fix the first broken line.', 'Corrigez la première ligne cassée.'))
}

const buildChecklist = (type: TechniqueQualityChecklist['type'], overview: LocalizedText, checks: QualityCheckItem[], passThreshold: number, ifPassed: LocalizedText, ifFailed: LocalizedText): TechniqueQualityChecklist => ({ type, overview, checks, passThreshold, ifPassed, ifFailed })

const systemSpecs: Array<{ id: string; title: string; overview: string; kind: 'control' | 'escape' | 'guard' | 'wrestling' | 'safety'; checklistSafety?: boolean }> = [
  { id: 'positional-hierarchy', title: 'Positional Hierarchy', overview: 'Know which layer is safe, which is dangerous, and which layer should come next.', kind: 'control' },
  { id: 'inside-position', title: 'Inside Position', overview: 'Win the inside lane with hands, head, knees, and hips before you attack or escape.', kind: 'control' },
  { id: 'frames-pummeling', title: 'Frames and Pummeling', overview: 'Use structure to create space, then pummel back inside instead of pushing with arms.', kind: 'escape' },
  { id: 'dilemmas-two-way-attacks', title: 'Dilemmas and Two-Way Attacks', overview: 'Force the opponent to defend one line and expose the next.', kind: 'control' },
  { id: 'failure-response-transitions', title: 'Failure Response and Transitions', overview: 'When the first line fails, change angle, change grip, or change position quickly.', kind: 'control' },
  { id: 'back-survival', title: 'Back Survival', overview: 'Protect the neck, win the hands, and clear the hooks before you think about offense.', kind: 'escape' },
  { id: 'leg-lock-safety-basics', title: 'Leg Lock Safety Basics', overview: 'Hide the heel, free the knee line, and do not rotate blindly.', kind: 'safety', checklistSafety: true },
  { id: 'seated-guard-retention', title: 'Seated Guard Retention', overview: 'Keep inside position, posture control, and a clear recovery lane while seated.', kind: 'guard' },
  { id: 'supine-guard-retention', title: 'Supine Guard Retention', overview: 'Keep frames, feet, and hip movement alive while on your back.', kind: 'guard' },
  { id: 'half-guard-knee-shield', title: 'Half Guard Knee Shield', overview: 'Use the knee shield, underhook, and head line to protect and recover.', kind: 'guard' },
  { id: 'half-guard-wrestle-up', title: 'Half Guard Wrestle-Up', overview: 'Turn the half guard into a stand-up, single leg, or top position.', kind: 'wrestling' },
  { id: 'shin-to-shin-entry', title: 'Shin-to-Shin Entry', overview: 'Use shin contact, posture pull, and angle to enter your attack.', kind: 'wrestling' },
  { id: 'single-leg-x-basics', title: 'Single Leg X Basics', overview: 'Keep the connection, protect the knee line, and sweep or stand at the right time.', kind: 'wrestling' },
  { id: 'k-guard-entry', title: 'K-Guard Entry', overview: 'Use hip angle and hooks to create a safer entering line.', kind: 'guard' },
  { id: 'butterfly-guard-off-balance', title: 'Butterfly Guard Off-Balance', overview: 'Load the hooks and use a pull that breaks balance before the sweep.', kind: 'guard' },
  { id: 'technical-stand-up', title: 'Technical Stand-Up', overview: 'Post, protect the head, and stand without giving up the inside line.', kind: 'wrestling' },
  { id: 'hand-fighting', title: 'Hand Fighting', overview: 'Win the inside tie, peel wrists, and keep the head in the right place.', kind: 'wrestling' },
  { id: 'snapdown-front-headlock', title: 'Snapdown to Front Headlock', overview: 'Snap the head down, control the line, and move behind or to a front headlock.', kind: 'wrestling' },
  { id: 'single-leg-bjj', title: 'Single Leg for BJJ', overview: 'Keep the head safe, protect the knee line, and finish with angle.', kind: 'wrestling' },
  { id: 'sprawl-go-behind', title: 'Sprawl and Go-Behind', overview: 'Kill the shot, keep hips heavy, and circle behind the opponent.', kind: 'wrestling' },
  { id: 'competition-ruleset-awareness', title: 'Ruleset Awareness', overview: 'Use legality, score, clock, and penalty risk to choose the right next exchange.', kind: 'control' },
  { id: 'guard-pulling-strategy', title: 'Guard Pulling Strategy', overview: 'Pull with purpose, land in a preferred guard, and keep the neck safe.', kind: 'guard' },
  { id: 'scramble-control', title: 'Scramble Control', overview: 'Win the head, hips, and inside lane before the scramble gets wild.', kind: 'wrestling' },
]

const extraMicroDetailSystems: Record<string, MicroDetailSystem> = Object.fromEntries(
  systemSpecs.map((spec) => [
    spec.id,
    makeSystem(spec.id, spec.title, spec.overview, spec.kind),
  ]),
)

const extraQualityChecklists: Record<string, TechniqueQualityChecklist> = Object.fromEntries(
  systemSpecs.map((spec) => [
    spec.id,
    makeChecklist(spec.id, spec.title, spec.kind, spec.checklistSafety),
  ]),
)

export { extraMicroDetailSystems, extraQualityChecklists }
