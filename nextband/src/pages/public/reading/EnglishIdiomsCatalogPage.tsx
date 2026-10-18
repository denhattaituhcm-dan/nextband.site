import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import {
  BookOpen,
  Volume2,
  FileCheck2,
  Compass,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
} from "lucide-react";
interface UnitCatalogItem {
  id: number;
  unit_number_str: string;
  title_en: string;
  title_vi: string;
  section: string;
  description_vi: string;
  total_idioms: number;
  total_exercises: number;
  modules: { id: string; title: string; sample: string }[];
  tags: string[];
  accent: string;
  isAvailable: boolean;
  cover_image: string;
}

const UNITS_CATALOG: UnitCatalogItem[] = [
  {
    id: 1,
    unit_number_str: "01",
    title_en: "Age",
    title_vi: "Tuổi tác & Các giai đoạn cuộc đời",
    section: "DESCRIBING PEOPLE AND THINGS",
    description_vi:
      "Khám phá 20 thành ngữ cốt lõi và cụm từ cố định về tuổi thơ, thanh xuân nồng nhiệt, bước ngoặt trưởng thành và những năm tháng xế chiều.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "1.1",
        title: "Idioms about age",
        sample: "no spring chicken, long in the tooth, over the hill...",
      },
      {
        id: "1.2",
        title: "Expressions with 'age'",
        sample: "look your age, golden age, come of age...",
      },
    ],
    tags: ["Tuổi tác", "Trưởng thành", "Thời gian"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    unit_number_str: "02",
    title_en: "Friends and family",
    title_vi: "Gia đình & Tình bạn thâm giao",
    section: "DESCRIBING PEOPLE AND THINGS",
    description_vi:
      "20 thành ngữ then chốt diễn tả tình bạn, kết giao tâm đầu ý hợp, xung đột gia tộc và các mối quan hệ ruột thịt nhiều thế hệ.",
    total_idioms: 20,
    total_exercises: 6,
    modules: [
      {
        id: "2.1",
        title: "Idioms about relationships",
        sample: "hit it off, see eye to eye, on the same wavelength...",
      },
      {
        id: "2.2",
        title: "Idioms about family",
        sample: "flesh and blood, bad blood, run in the family...",
      },
    ],
    tags: ["Bạn bè", "Gia đình", "Quan hệ xã hội"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    unit_number_str: "03",
    title_en: "Appearance and background",
    title_vi: "Diện mạo & Xuất thân xã hội",
    section: "DESCRIBING PEOPLE AND THINGS",
    description_vi:
      "20 thành ngữ ấn tượng miêu tả diện mạo, nét tương đồng người với người, phong thái ăn mặc sang trọng chỉn chu và nguồn gốc xuất thân.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "3.1",
        title: "Appearance and similarity",
        sample: "dead ringer, spitting image, dressed to kill...",
      },
      {
        id: "3.2",
        title: "Clothing, background, and social status",
        sample: "born with a silver spoon, down at heel, cut a dash...",
      },
    ],
    tags: ["Ngoại hình", "Trang phục", "Địa vị"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    unit_number_str: "04",
    title_en: "Personality traits",
    title_vi: "Nét tính cách qua lăng kính ẩn dụ",
    section: "Describing people and things",
    description_vi:
      "Khắc họa tính cách con người qua lăng kính động vật và thực phẩm, từ điềm tĩnh kiên định đến lập dị, sắc sảo hay chân chất.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "4.1",
        title: "Personality traits with animal metaphors",
        sample: "eager beaver, lone wolf, dark horse, busybody...",
      },
      {
        id: "4.2",
        title: "Personality traits with food & objects",
        sample: "tough cookie, cool as a cucumber, salt of the earth...",
      },
    ],
    tags: ["Tính cách", "Ẩn dụ độc đáo", "Tả người"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    unit_number_str: "05",
    title_en: "Good things",
    title_vi: "Sự xuất sắc, may mắn & Điều tuyệt hảo",
    section: "Describing people and things",
    description_vi:
      "20 thành ngữ đỉnh cao miêu tả sự xuất sắc, thành tựu kiệt xuất, những điều tuyệt vời ngoài sức tưởng tượng và cơ duyên tái ông thất mã.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "5.1",
        title: "Praise and superlatives",
        sample: "the best thing since sliced bread, stole the show, the bee's knees...",
      },
      {
        id: "5.2",
        title: "Excellence, advantages, and peak performance",
        sample: "the best of both worlds, a blessing in disguise, crème de la crème...",
      },
    ],
    tags: ["Khen ngợi", "Xuất sắc", "May mắn"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    unit_number_str: "06",
    title_en: "Bad things",
    title_vi: "Sự thất vọng, phẩm chất kém & Giọt nước tràn ly",
    section: "DESCRIBING PEOPLE AND THINGS",
    description_vi:
      "Khám phá 20 thành ngữ then chốt diễn tả chất lượng tồi tàn, sự hụt hẫng thất vọng, cảm giác tẻ nhạt đến phát ngấy và giới hạn chịu đựng giọt nước tràn ly.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "6.1",
        title: "Disappointment, low quality & negative experiences",
        sample: "leave a bad taste in my mouth, second rate, not my cup of tea...",
      },
      {
        id: "6.2",
        title: "Wear and tear, boredom, and the breaking point",
        sample: "seen better days, like watching paint dry, the last straw...",
      },
    ],
    tags: ["Thất vọng", "Chất lượng kém", "Giới hạn"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    unit_number_str: "07",
    title_en: "Animals",
    title_vi: "Thế giới động vật & Ẩn dụ ngụ ngôn",
    section: "DESCRIBING PEOPLE AND THINGS",
    description_vi:
      "20 thành ngữ đặc sắc mượn tập tính sinh học, ngụ ngôn cổ xưa và đặc trưng loài vật để khắc họa tâm lý, hành vi con người và tình huống xã hội.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "7.1",
        title: "Animal behaviors, instincts & metaphors",
        sample: "a scaredy-cat, cry wolf, dropping like flies, elephant in the room...",
      },
      {
        id: "7.2",
        title: "Creature symbols, stereotypes & animal attributes",
        sample: "a night owl, get someone's goat, bird's-eye view, lion's share...",
      },
    ],
    tags: ["Động vật", "Ẩn dụ ngụ ngôn", "Tập tính"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    unit_number_str: "08",
    title_en: "Food",
    title_vi: "Ẩm thực, Bếp núc & Ẩn dụ Đời sống",
    section: "DESCRIBING PEOPLE AND THINGS",
    description_vi:
      "Khám phá 20 thành ngữ đặc sắc mượn chất liệu ẩm thực, bánh trái, bơ sữa và thói quen ăn uống để khắc họa tâm lý, thế giới nghề nghiệp và các mối quan hệ xã hội.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "8.1",
        title: "Food metaphors in work, life & nature",
        sample: "as flat as a pancake, puts food on the table, packed like sardines, spoon-feeds...",
      },
      {
        id: "8.2",
        title: "Appetite, baking & culinary psychology",
        sample: "can't have your cake and eat it, takes the cake, warm and toasty, butterfingers...",
      },
    ],
    tags: ["Ẩm thực", "Bếp núc", "Ẩn dụ"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 9,
    unit_number_str: "09",
    title_en: "Agreeing and disagreeing",
    title_vi: "Đồng thuận, Bất đồng & Thương lượng",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ then chốt diễn tả sự đồng thuận, bất đồng nảy lửa, nghệ thuật thỏa hiệp và chốt giao kèo trong công việc lẫn đời sống.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "9.1",
        title: "Agreement and understanding",
        sample: "see eye to eye, give the green light, on the same page...",
      },
      {
        id: "9.2",
        title: "Disagreement and conflict",
        sample: "at odds, a bone of contention, fight like cats and dogs...",
      },
      {
        id: "9.3",
        title: "Compromise and resolution",
        sample: "bury the hatchet, hammer out a deal, hold out an olive branch...",
      },
    ],
    tags: ["Đồng thuận", "Tranh luận", "Đàm phán"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 10,
    unit_number_str: "10",
    title_en: "Behavior",
    title_vi: "Đối nhân xử thế & Chuẩn mực hành vi",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ then chốt diễn tả cách đối nhân xử thế, lòng nhân ái thấu cảm, thái độ đối xử tệ bạc, trò đùa trêu ghẹo và quy chuẩn hành vi xã hội.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "10.1",
        title: "Sympathy and kindness",
        sample: "lend a hand, feel for, generous to a fault, sympathetic ear...",
      },
      {
        id: "10.2",
        title: "Treating people badly",
        sample: "leave in the lurch, give a hard time, treat like dirt, below the belt...",
      },
      {
        id: "10.3",
        title: "Teasing people",
        sample: "poke fun at, ribbed me, pulling my leg, practical jokes...",
      },
      {
        id: "10.4",
        title: "Expressions with 'behave' and 'behavior'",
        sample: "well behaved, behave beautifully, on best behavior, out of character...",
      },
    ],
    tags: ["Hành vi", "Đối nhân xử thế", "Giao tiếp"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 11,
    unit_number_str: "11",
    title_en: "Emotions",
    title_vi: "Cảm xúc & Tâm trạng con người",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ kinh điển khắc họa các cung bậc cảm xúc dữ dội của con người qua ẩn dụ bộ phận cơ thể, sắc màu tâm trạng và thế giới ẩm thực.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "11.1",
        title: "Idioms using vocabulary about the body",
        sample: "at each other's throats, wears heart on sleeve, got cold feet, tongue-tied...",
      },
      {
        id: "11.2",
        title: "Idioms using vocabulary about colors",
        sample: "feeling blue, saw red, green with envy, as white as a sheet...",
      },
      {
        id: "11.3",
        title: "Idioms using vocabulary about food",
        sample: "went bananas, driving me nuts, full of beans, had egg on my face...",
      },
    ],
    tags: ["Cảm xúc", "Tâm trạng", "Ẩn dụ màu sắc"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 12,
    unit_number_str: "12",
    title_en: "Positive emotions",
    title_vi: "Cảm xúc tích cực & Hân hoan",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ ngập tràn năng lượng tích cực, niềm hoan hỉ ngất ngây, tình yêu say đắm, lòng nhiệt huyết cống hiến và sự phấn khích hồi hộp khôn nguôi.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "12.1",
        title: "Happiness",
        sample: "on cloud nine, on top of the world, grin from ear to ear, over the moon...",
      },
      {
        id: "12.2",
        title: "Expressions with 'joy'",
        sample: "pride and joy, jump for joy, weep with joy, a joy to behold...",
      },
      {
        id: "12.3",
        title: "Enthusiasm",
        sample: "raring to go, heart and soul, eager beaver, bright-eyed and bushy-tailed...",
      },
      {
        id: "12.4",
        title: "Excitement",
        sample: "on the edge of seat, with bated breath, bouncing off the walls, butterflies in stomach...",
      },
    ],
    tags: ["Cảm xúc tích cực", "Hạnh phúc", "Phấn khởi"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 13,
    unit_number_str: "13",
    title_en: "Negative emotions",
    title_vi: "Cảm xúc tiêu cực (Buồn bã, Tức giận, Nỗi sợ & Xấu hổ)",
    section: "ATTITUDE",
    description_vi:
      "Khám phá 20 thành ngữ then chốt diễn tả các sắc thái cảm xúc tiêu cực, từ nỗi buồn sâu lắng, cơn giận dữ sôi máu, nỗi khiếp đảm lạnh sống lưng cho đến sự ngượng ngùng muốn độn thổ.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "13.1",
        title: "Sadness",
        sample: "down in the dumps, a lump in his throat, with a heavy heart, reduced to tears, a downer...",
      },
      {
        id: "13.2",
        title: "Anger",
        sample: "makes my blood boil, driving me crazy, kicked myself, hit the roof, on the warpath...",
      },
      {
        id: "13.3",
        title: "Fear",
        sample: "that sinking feeling, sent shivers down my spine, blood ran cold, on edge, shaking in boots...",
      },
      {
        id: "13.4",
        title: "Embarrassment",
        sample: "lost face, wanted the earth to swallow her up, died of shame, tails between their legs...",
      },
    ],
    tags: ["Cảm xúc tiêu cực", "Tức giận", "Nỗi sợ"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 14,
    unit_number_str: "14",
    title_en: "Memory",
    title_vi: "Trí nhớ & Quên lãng (Ghi nhớ, Đãng trí, Kỷ niệm & Hoài niệm)",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ then chốt diễn tả hoạt động trí nhớ, hiện tượng quên lãng, ký ức ùa về, hồi tưởng quá khứ và nỗ lực vắt kiệt óc để suy nghĩ.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "14.1",
        title: "Idioms and expressions about memory",
        sample: "on the tip of my tongue, memory like a sieve, train of thought, rings a bell, racking my brain...",
      },
    ],
    tags: ["Trí nhớ", "Ký ức", "Hoài niệm"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 15,
    unit_number_str: "15",
    title_en: "The body",
    title_vi: "Các bộ phận cơ thể (Cảm xúc, Hành động & Phản xạ con người)",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ kinh điển mượn ẩn dụ các bộ phận cơ thể (mắt, tai, tim, vai, cằm, da, dây thần kinh), từ sự hồi hộp bồn chồn đến nghệ thuật tùy cơ ứng biến.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "15.1",
        title: "Idioms using vocabulary about the body",
        sample: "heart set on, bundle of nerves, eyes in the back of head, cold feet, rule of thumb, play it by ear...",
      },
    ],
    tags: ["Bộ phận cơ thể", "Phản xạ", "Cảm xúc"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 16,
    unit_number_str: "16",
    title_en: "War and weapons",
    title_vi: "Chiến tranh & Vũ khí (Xung đột, Bất hòa, Kiên định & Đàm phán)",
    section: "ATTITUDE",
    description_vi:
      "20 thành ngữ mượn thuật ngữ quân sự, chiến hào, hỏa lực và vũ khí chiến đấu cổ điển để khắc họa sắc sảo các xung đột, sự phản bội, lòng kiên định phòng thủ và nghệ thuật đàm phán.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "16.1",
        title: "Idioms using vocabulary about war and weapons",
        sample: "an ax to grind, loose cannon, stabbed in the back, hold down the fort, long shot, catch off guard...",
      },
    ],
    tags: ["Chiến tranh", "Vũ khí", "Chiến lược"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 17,
    unit_number_str: "17",
    title_en: "Amount and distance",
    title_vi: "Số lượng & Khoảng cách (Định lượng, Cự ly & Không gian)",
    section: "SITUATIONS AND CIRCUMSTANCES",
    description_vi:
      "20 thành ngữ phong phú diễn tả các thang bậc số lượng (từ hạt muối bỏ bể đến trọn gói A-Z) và khoảng cách địa lý (từ trong gang tấc bước chân đến chốn khỉ ho cò gáy xa xôi).",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "17.1",
        title: "Amount",
        sample: "a drop in the ocean, stacks of, everything but the kitchen sink, tons of, lock, stock, and barrel...",
      },
      {
        id: "17.2",
        title: "Distance",
        sample: "a stone's throw, far-flung corner, within walking distance, off the beaten path, middle of nowhere...",
      },
    ],
    tags: ["Số lượng", "Khoảng cách", "Không gian"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 18,
    unit_number_str: "18",
    title_en: "Beginning and ending",
    title_vi: "Khởi đầu & Kết thúc (Xuất phát, Lật trang mới, Hạ màn & Dấu chấm hết)",
    section: "SITUATIONS AND CIRCUMSTANCES",
    description_vi:
      "20 thành ngữ sinh động về sự khởi đầu và kết thúc, từ vạch xuất phát thuận buồm xuôi gió, lật sang trang mới cuộc đời cho đến lúc hạ màn trọn vẹn và đặt dấu chấm hết.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "18.1",
        title: "Beginning",
        sample: "made a fresh start, hit the ground running, kicked off, got off to a flying start, get the ball rolling...",
      },
      {
        id: "18.2",
        title: "Ending",
        sample: "call it a day, putting the finishing touches on it, drew to a close, ground to a halt...",
      },
      {
        id: "18.3",
        title: "Expressions with 'end'",
        sample: "put an end to, the end of an era, all good things must come to an end, the end is in sight...",
      },
    ],
    tags: ["Khởi đầu", "Kết thúc", "Tiến độ"],
    accent: "US (Mỹ)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 19,
    unit_number_str: "19",
    title_en: "Chance, luck, and probability",
    title_vi: "Cơ hội, Vận may & Xác suất (Cơ duyên, Ăn may, Bất khả thi & Ước mơ viển vông)",
    section: "SITUATIONS AND CIRCUMSTANCES",
    description_vi:
      "20 thành ngữ kinh điển về cơ hội, vận may và xác suất xảy ra, từ cơ duyên trời ban, ăn may phút chót đến những ước mơ viển vông khi mặt trời mọc đằng tây.",
    total_idioms: 20,
    total_exercises: 5,
    modules: [
      {
        id: "19.1",
        title: "Expressions with 'chance'",
        sample: "on the off-chance, a slim chance, in for a chance of, don't stand a chance...",
      },
      {
        id: "19.2",
        title: "Expressions with 'luck'",
        sample: "a stroke of luck, beginner's luck, don't push your luck, in luck, out of luck, sheer luck...",
      },
      {
        id: "19.3",
        title: "Probability",
        sample: "the hot favorite, in the cards, a foregone conclusion, when pigs fly, pie in the sky, against all odds...",
      },
    ],
    tags: ["Cơ hội", "May mắn", "Xác suất"],
    accent: "UK (Anh)",
    isAvailable: true,
    cover_image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=700&q=80",
  },
];

const UPCOMING_UNITS = [
  { id: 20, unit_number_str: "20", title_en: "Ease and difficulty", title_vi: "Dễ dàng & Khó khăn" },
  { id: 21, unit_number_str: "21", title_en: "Safety and danger", title_vi: "An toàn & Nguy hiểm" },
  { id: 22, unit_number_str: "22", title_en: "Difficult situations", title_vi: "Tình huống nan giải" },
  { id: 23, unit_number_str: "23", title_en: "The weather and nature", title_vi: "Thời tiết & Thiên nhiên" },
  { id: 24, unit_number_str: "24", title_en: "Talking", title_vi: "Trò chuyện & Giao tiếp" },
];

export default function EnglishIdiomsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUnits = UNITS_CATALOG.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      u.title_en.toLowerCase().includes(q) ||
      u.title_vi.toLowerCase().includes(q) ||
      u.description_vi.toLowerCase().includes(q) ||
      u.tags.some((t) => t.toLowerCase().includes(q)) ||
      u.modules.some((m) => m.title.toLowerCase().includes(q) || m.sample.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] font-sans selection:bg-[#F2DBD3] selection:text-[#2D2825]">
      <SEO
        title="Kho Thành Ngữ Tiếng Anh Theo Chủ Đề — English Idioms Master | ARIS IELTS"
        description="Khám phá và luyện tập toàn diện các chủ đề thành ngữ tiếng Anh theo chuẩn giáo trình DK English for Everyone. Tích hợp audio chuẩn bản ngữ, nghiên cứu từ nguyên học và bài tập chấm điểm tương tác."
      />

      {/* Sub-nav Header */}
      <nav className="border-b border-[#EAE3D9] bg-[#FAF7F2]/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-5 text-xs font-medium text-[#7A7067]">
            <Link
              to="/reading"
              className="hover:text-[#2D2825] transition-colors flex items-center gap-1 font-semibold"
            >
              ← Tủ sách đọc báo
            </Link>
            <span className="text-[#C5BCB1]">•</span>
            <span className="font-bold text-[#002147] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0369a1]" />
              Kho Thành Ngữ English Idioms Master
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              19 Units Sẵn Sàng (380 Idioms)
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#002147] via-[#0369a1] to-[#0284c7] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-6 max-w-4xl mx-auto text-center flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Kho Thành Ngữ Tiếng Anh Theo Chủ Đề
            </h1>

            <p className="text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed font-light mx-auto">
              Tuyển tập thành ngữ và cụm từ cố định trực quan theo giáo trình{" "}
              <strong className="text-white font-medium">English for Everyone: English Idioms</strong>{" "}
              (DK Publishing). Mỗi bài học trang bị đầy đủ audio bản ngữ giọng Anh/Mỹ, nghiên cứu từ nguyên học OED giải mã lý do tại sao cụm từ có nghĩa như vậy, cùng hệ thống 5 bài tập tương tác chấm điểm chuẩn xác.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 w-full">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">19</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Units đã số hóa</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-sky-200">380</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Thành ngữ & Cụm từ</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-200">100%</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Audio bản ngữ US/UK</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-center">
                <div className="text-2xl sm:text-3xl font-black text-purple-200">95</div>
                <div className="text-xs text-slate-200 font-medium mt-0.5">Bài tập tương tác</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EAE3D9] shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm Unit theo tên, chủ đề, từ khóa hoặc thành ngữ..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
            />
          </div>

          <div className="text-xs text-[#7A7067] font-medium flex items-center gap-1.5 shrink-0 px-1">
            <span>Hiển thị:</span>
            <strong className="text-[#002147] font-bold">{filteredUnits.length} Units</strong>
          </div>
        </div>

        {/* SECTION 1: AVAILABLE UNITS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0369a1] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                Phần 1: Miêu tả con người & Sự vật
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                Danh Sách Các Unit Đã Số Hóa
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
              Chọn một bài học để bắt đầu học và làm bài tập
            </span>
          </div>

          {/* Unit Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredUnits.map((unit) => (
              <Link
                key={unit.id}
                to={`/reading/idioms/${unit.id}`}
                className="bg-white rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs hover:shadow-lg hover:border-sky-400 hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image Cover Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <img
                    src={unit.cover_image}
                    alt={unit.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Top Stats Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                    <BookOpen className="w-3 h-3 text-sky-300" />
                    <span>{unit.total_idioms} Thành ngữ</span>
                  </div>

                  {/* Section / Unit Badge */}
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-3 py-1 rounded-lg bg-[#002147] text-white text-xs font-black shadow-sm tracking-wide">
                      Unit {unit.unit_number_str}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#0369a1] transition line-clamp-1">
                      {unit.title_en}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 line-clamp-1">
                      {unit.title_vi}
                    </p>
                  </div>

                  {/* Meta Footer */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Volume2 className="w-3 h-3 text-amber-500" />
                      Giọng {unit.accent.includes("Mỹ") ? "US" : "UK"}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-[#0369a1] group-hover:translate-x-0.5 transition-transform">
                      {unit.total_exercises} Bài tập • Vào học →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredUnits.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">Không tìm thấy Unit nào khớp với "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-sky-600 hover:underline font-bold"
              >
                Xóa tìm kiếm
              </button>
            </div>
          )}
        </section>

        {/* SECTION 2: ROADMAP PREVIEW */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Lộ trình số hóa
            </span>
            <h3 className="text-xl sm:text-2xl font-black">Các Chủ Đề Kế Tiếp Đang Được Biên Soạn</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Giáo trình DK English Idioms gồm tổng cộng 54 Units toàn diện. Đội ngũ học thuật NextBand đang lần lượt số hóa đầy đủ âm thanh, nghiên cứu từ nguyên học và bài tập tương tác cho từng unit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {UPCOMING_UNITS.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-slate-300 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-amber-300 font-bold text-[11px]">Unit {u.unit_number_str}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                    Đang số hóa
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{u.title_en}</div>
                <div className="text-[11px] text-slate-400">{u.title_vi}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: METHODOLOGY FOOTER */}
        <section className="bg-white rounded-3xl border border-[#EAE3D9] p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0369a1] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Phương pháp độc quyền NextBand
            </span>
            <h3 className="text-2xl font-black text-[#002147]">Tại sao phương pháp này giúp bạn nhớ vĩnh viễn?</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-800 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900">Bối cảnh trực quan & Audio Mỹ</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Học qua câu ngữ cảnh thực tế với audio chuẩn giọng Mỹ, giúp khắc sâu phát âm, ngữ điệu và trọng âm tự nhiên.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900">Từ nguyên học (Etymology)</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Không học vẹt. Khám phá câu chuyện lịch sử và cơ chế ẩn dụ đằng sau thành ngữ để hiểu bản chất sâu xa nhất.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900">Phản xạ qua 5 bài tập tương tác</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Chuyển hóa từ vựng thụ động thành chủ động với các dạng bài nối nghĩa, điền chỗ trống, trắc nghiệm ngữ cảnh và tình huống thực tế.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
