export const calculateLevel = (
  xp: number
) => {
  if (xp >= 1000) {
    return "Legend";
  }

  if (xp >= 500) {
    return "Master";
  }

  if (xp >= 200) {
    return "Explorer";
  }

  return "Beginner";
};

export const getBadges = (
  xp: number
) => {
  const badges = [];

  if (xp >= 100) {
    badges.push("🔥 Rising Star");
  }

  if (xp >= 300) {
    badges.push("🏆 Quiz Master");
  }

  if (xp >= 700) {
    badges.push("⚡ Brain Storm");
  }

  if (xp >= 1000) {
    badges.push("👑 Legend");
  }

  return badges;
};