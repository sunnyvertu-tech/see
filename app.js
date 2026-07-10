const seedItems = [
  { id: 1, date: "2026-05-24", model: "AQ", style: "白刚红色小牛皮", vsn: "23009799", warehouse: "贵阳", price: 31800, cost: 20670, sold: true, salePrice: 29020, seller: "叶美" },
  { id: 2, date: "2026-05-24", model: "AQ", style: "白刚绿色小牛", vsn: "23008506", warehouse: "贵阳", price: 31800, cost: 20670, sold: false, salePrice: 0, seller: "" },
  { id: 3, date: "2026-05-24", model: "AQ", style: "白刚粉色小牛", vsn: "23012093", warehouse: "贵阳", price: 31800, cost: 20670, sold: false, salePrice: 0, seller: "" },
  { id: 4, date: "2026-05-24", model: "AQ", style: "白刚蓝色小牛皮", vsn: "23007858", warehouse: "成都", price: 31800, cost: 20670, sold: true, salePrice: 21624, seller: "陈梦雪" },
  { id: 5, date: "2026-05-24", model: "AQ", style: "白刚棕色小牛皮", vsn: "23011802", warehouse: "贵阳", price: 31800, cost: 20670, sold: true, salePrice: 21306, seller: "肖丽" },
  { id: 6, date: "2026-05-24", model: "AQ", style: "白刚黑色小牛皮", vsn: "23007363", warehouse: "贵阳", price: 31800, cost: 20670, sold: true, salePrice: 21306, seller: "肖丽" },
  { id: 7, date: "2026-05-24", model: "AQ", style: "黑刚红桃木", vsn: "23013537", warehouse: "贵阳", price: 32800, cost: 21320, sold: true, salePrice: 22304, seller: "母彬" },
  { id: 8, date: "2026-05-24", model: "量子", style: "红色玛瑙", vsn: "22010815", warehouse: "贵阳", price: 35800, cost: 23270, sold: true, salePrice: 23986, seller: "肖丽" },
  { id: 9, date: "2026-05-24", model: "AQ", style: "白刚棕色小牛皮", vsn: "23010500", warehouse: "贵阳", price: 31800, cost: 20670, sold: true, salePrice: 21306, seller: "肖丽" },
  { id: 10, date: "2026-05-24", model: "AQ", style: "黑陶树莓红小牛", vsn: "23007289", warehouse: "贵阳", price: 31800, cost: 20670, sold: true, salePrice: 21306, seller: "肖丽" },
  { id: 11, date: "2026-05-24", model: "量子", style: "红色玛瑙", vsn: "22016625", warehouse: "贵阳", price: 35800, cost: 23270, sold: true, salePrice: 24344, seller: "贾思懿" },
  { id: 12, date: "2026-05-28", model: "耳机", style: "乌木耳机", vsn: "025011718", warehouse: "成都", price: 2499, cost: 0, sold: true, salePrice: 1000, seller: "母彬" },
  { id: 13, date: "2026-05-28", model: "耳机", style: "乌木耳机", vsn: "025011854", warehouse: "贵阳", price: 2499, cost: 0, sold: true, salePrice: 2000, seller: "soso" },
  { id: 14, date: "2026-06-01", model: "ALPHAFOLD", style: "黑色纤缝小牛皮样机", vsn: "25001212", warehouse: "贵阳", price: 34800, cost: 17400, sold: false, salePrice: 0, seller: "" },
  { id: 15, date: "2026-06-16", model: "量子", style: "黑色小牛皮", vsn: "22016751", warehouse: "贵阳", price: 25800, cost: 15931.5, sold: true, salePrice: 20220, seller: "soso" },
  { id: 16, date: "2026-06-25", model: "量子", style: "黑色小牛皮", vsn: "22019366", warehouse: "成都", price: 25800, cost: 15931.5, sold: true, salePrice: 17526, seller: "陈梦雪" },
  { id: 17, date: "2026-06-26", model: "AQ", style: "白刚黑色鳄鱼皮", vsn: "23010736", warehouse: "成都", price: 42800, cost: 26985.4, sold: true, salePrice: 28647, seller: "肖丽" },
  { id: 18, date: "2026-06-26", model: "ALPHAFOLD", style: "红色鳄鱼皮", vsn: "25002586", warehouse: "成都", price: 54800, cost: 35620, sold: true, salePrice: 41064, seller: "肖丽" }
];

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function readStoredArray(key, fallback) {
  const value = readStoredJson(key, fallback);
  return Array.isArray(value) ? value : fallback;
}

function cleanText(value, maxLength = 80) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function cleanMoney(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function cleanDate(value) {
  const normalized = cleanText(value, 20).replaceAll("/", "-");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return dateKey(todayDate());
  const parsed = parseItemDate(normalized);
  return dateKey(parsed) === normalized ? normalized : dateKey(todayDate());
}

function normalizeItem(item = {}, index = 0) {
  const sold = Boolean(item.sold);
  const warehouse = cleanText(item.warehouse, 20);
  return {
    id: Number.isFinite(Number(item.id)) ? Number(item.id) : Date.now() + index,
    date: cleanDate(item.date),
    model: cleanText(item.model),
    style: cleanText(item.style, 120),
    vsn: cleanText(item.vsn, 40),
    warehouse: ["成都", "贵阳"].includes(warehouse) ? warehouse : "成都",
    price: cleanMoney(item.price),
    cost: cleanMoney(item.cost),
    sold,
    salePrice: sold ? cleanMoney(item.salePrice) : 0,
    seller: sold ? cleanText(item.seller || item.soldBy, 40) : "",
    owner: cleanText(item.owner, 40),
    soldBy: sold ? cleanText(item.soldBy, 40) : ""
  };
}

function normalizeUser(user = {}) {
  return {
    username: cleanText(user.username, 40),
    password: cleanText(user.password, 80),
    role: ["super_admin", "manager", "employee"].includes(user.role) ? user.role : "employee",
    permissions: user.permissions
  };
}

let items = readStoredArray("sales-demo-items", seedItems).map(normalizeItem);
let sortKey = "date";
let sortDir = "desc";
let currentView = "";
let currentUserPage = "";
const featureModules = [
  { key: "stock", label: "库存" },
  { key: "sales", label: "销售" },
  { key: "addStock", label: "新增库存" },
  { key: "addSales", label: "新增销售" },
  { key: "refreshPage", label: "刷新" },
  { key: "importData", label: "导入" },
  { key: "exportData", label: "导出" },
  { key: "sellItem", label: "售卖登记" },
  { key: "deleteItem", label: "删除商品" },
  { key: "userManage", label: "用户管理" }
];
const allFeaturePermissions = Object.fromEntries(featureModules.map((feature) => [feature.key, true]));
const defaultRolePermissions = {
  super_admin: { ...allFeaturePermissions },
  manager: { ...allFeaturePermissions, userManage: false },
  employee: {
    stock: true,
    sales: true,
    addStock: false,
    addSales: true,
    refreshPage: true,
    importData: false,
    exportData: true,
    sellItem: true,
    deleteItem: false,
    userManage: false
  }
};
const defaultUsers = [
  { username: "admin", password: "admin123", role: "super_admin", permissions: { ...allFeaturePermissions } },
  { username: "manager", password: "123456", role: "manager" },
  { username: "employee", password: "123456", role: "employee" },
  { username: "母彬", password: "123456", role: "super_admin", permissions: { ...allFeaturePermissions } },
  { username: "叶美", password: "123456", role: "employee", permissions: { ...defaultRolePermissions.employee } },
  { username: "陈梦雪", password: "123456", role: "employee", permissions: { ...defaultRolePermissions.employee } },
  { username: "肖丽", password: "123456", role: "employee", permissions: { ...defaultRolePermissions.employee } },
  { username: "贾思懿", password: "123456", role: "employee", permissions: { ...defaultRolePermissions.employee } },
  { username: "soso", password: "123456", role: "employee", permissions: { ...defaultRolePermissions.employee } }
];
let users = readStoredArray("sales-demo-users", []).map(normalizeUser).filter((user) => user.username && user.password);
let currentUser = null;
let currentRole = "";
let permissions = readStoredJson("sales-demo-permissions", defaultRolePermissions);

const appShell = document.querySelector(".app-shell");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const tableBody = document.querySelector("#tableBody");
const tableFoot = document.querySelector("#tableFoot");
const viewButtons = document.querySelectorAll("[data-view]");
const companyPerformanceButton = document.querySelector("#companyPerformanceButton");
const salesNavSection = document.querySelector("#salesNavSection");
const salesMenuToggle = document.querySelector("#salesMenuToggle");
const salesMenuPanel = document.querySelector("#salesMenuPanel");
const userNavSection = document.querySelector("#userNavSection");
const userMenuToggle = document.querySelector("#userMenuToggle");
const userMenuPanel = document.querySelector("#userMenuPanel");
const userSectionTabs = document.querySelectorAll(".user-section-tab");
const currentUserLabel = document.querySelector("#currentUserLabel");
const logoutButton = document.querySelector("#logoutButton");
const userDialog = document.querySelector("#userDialog");
const userForm = document.querySelector("#userForm");
const userSubmitButton = document.querySelector("#userSubmitButton");
const userList = document.querySelector("#userList");
const userCount = document.querySelector("#userCount");
const newUserPermissions = document.querySelector("#newUserPermissions");
const managerPermissions = document.querySelector("#managerPermissions");
const employeePermissions = document.querySelector("#employeePermissions");
const userManagementPage = document.querySelector("#userManagementPage");
const userPageTitle = document.querySelector("#userPageTitle");
const userPageSubtitle = document.querySelector("#userPageSubtitle");
const userPageSections = document.querySelectorAll(".user-page-section");
const pageUserList = document.querySelector("#pageUserList");
const pageUserCount = document.querySelector("#pageUserCount");
const addUserPageForm = document.querySelector("#addUserPageForm");
const permissionsPageForm = document.querySelector("#permissionsPageForm");
const pageNewUserPermissions = document.querySelector("#pageNewUserPermissions");
const pageManagerPermissions = document.querySelector("#pageManagerPermissions");
const pageEmployeePermissions = document.querySelector("#pageEmployeePermissions");
const itemForm = document.querySelector("#itemForm");
const stockDialog = document.querySelector("#stockDialog");
const addStockButton = document.querySelector("#addStockButton");
const stockSubmitButton = document.querySelector("#stockSubmitButton");
const saleDialog = document.querySelector("#saleDialog");
const saleForm = document.querySelector("#saleForm");
const importInput = document.querySelector("#importInput");
const metricsSection = document.querySelector(".metrics");
const tableZone = document.querySelector(".table-zone");

const money = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 1
});
const chartColors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#f97316"];
const salesGoals = {
  day: 100000,
  week: 560000,
  month: 3500000
};
let userDialogSection = "userListSection";
const userPageMeta = {
  userListPage: {
    title: "人员列表",
    subtitle: "查看系统登录人员、角色和已开启的功能权限。"
  },
  addUserPage: {
    title: "新增用户",
    subtitle: "录入新员工账号，并单独配置这个账号可使用的功能按钮。"
  },
  permissionManagePage: {
    title: "权限管理",
    subtitle: "设置主管和员工新增账号时默认拥有的功能权限。"
  }
};

function save() {
  localStorage.setItem("sales-demo-items", JSON.stringify(items));
}

function savePermissions() {
  localStorage.setItem("sales-demo-permissions", JSON.stringify(permissions));
}

function saveUsers() {
  localStorage.setItem("sales-demo-users", JSON.stringify(users));
}

function normalizePermissionSet(source = {}, role = "employee") {
  const fallback = role === "super_admin" ? allFeaturePermissions : defaultRolePermissions[role] || defaultRolePermissions.employee;
  return Object.fromEntries(featureModules.map((feature) => [feature.key, Boolean(source[feature.key] ?? fallback[feature.key])]));
}

function normalizePermissions() {
  permissions = {
    super_admin: { ...allFeaturePermissions },
    manager: normalizePermissionSet(permissions.manager, "manager"),
    employee: normalizePermissionSet(permissions.employee, "employee")
  };
  users = users.map((user) => ({
    ...user,
    role: user.username === "母彬" ? "super_admin" : user.role,
    permissions: user.username === "母彬" ? { ...allFeaturePermissions } : user.permissions ? normalizePermissionSet(user.permissions, user.role) : undefined
  }));
  savePermissions();
  saveUsers();
}

function mergeDefaultUsers() {
  const existingNames = new Set(users.map((user) => user.username));
  defaultUsers.forEach((user) => {
    if (!existingNames.has(user.username)) {
      users.push({ ...user, permissions: user.permissions ? { ...user.permissions } : undefined });
    }
  });
  saveUsers();
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("zh-CN", { maximumFractionDigits: 1 });
}

function profitOf(item) {
  return item.sold ? Number(item.salePrice || 0) - Number(item.cost || 0) : 0;
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function parseItemDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function shiftDate(date, days) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeek(date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay() || 7;
  start.setDate(start.getDate() - day + 1);
  return start;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function isBetweenDates(value, start, end) {
  const target = parseItemDate(value);
  return target >= start && target <= end;
}

function visibleSalesItems() {
  return items.filter((item) => item.sold).filter((item) => canViewAllData() || isOwnItem(item));
}

function sumSales(list) {
  return list.reduce((sum, item) => sum + Number(item.salePrice || 0), 0);
}

function formatWan(value) {
  const wan = Number(value || 0) / 10000;
  return `${wan >= 10 ? wan.toFixed(1) : wan.toFixed(2)}万`;
}

function percentValue(current, base) {
  if (!base) return current ? 100 : 0;
  return Math.round(((current - base) / base) * 100);
}

function goalRate(value, goal) {
  if (!goal) return 0;
  return Math.min(999, Math.round((value / goal) * 100));
}

function renderBadges(containerId, badges) {
  const container = document.querySelector(containerId);
  container.innerHTML = badges.map((badge) => `
    <span class="metric-badge ${badge.value < 0 ? "bad" : ""}">${badge.value >= 0 ? "+" : ""}${badge.value}% ${badge.label}</span>
  `).join("");
}

function rankBySeller(list) {
  const ranks = new Map();
  list.forEach((item) => {
    const name = item.seller || item.soldBy || "未填写";
    ranks.set(name, (ranks.get(name) || 0) + Number(item.salePrice || 0));
  });
  return [...ranks.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

function renderRank(containerId, list) {
  const container = document.querySelector(containerId);
  const ranks = rankBySeller(list);
  const max = Math.max(...ranks.map((rank) => rank.value), 0);
  if (!ranks.length) {
    container.innerHTML = '<span class="bar-empty">暂无销售数据</span>';
    return;
  }
  container.innerHTML = ranks.map((rank, index) => {
    const width = max ? Math.max(8, Math.round((rank.value / max) * 100)) : 0;
    return `
      <div class="bar-row">
        <span>${escapeHtml(rank.name)}</span>
        <span class="bar-track"><i style="--bar-width: ${width}%; --bar-color: ${chartColors[index % chartColors.length]}"></i></span>
        <strong>${formatWan(rank.value)}</strong>
      </div>
    `;
  }).join("");
}

function renderPerformanceDashboard() {
  const dashboard = document.querySelector("#performanceDashboard");
  const dashboardHeader = document.querySelector("#dashboardHeader");
  const shouldShowDashboard = !currentView && !currentUserPage && canUse("sales");
  dashboard.classList.toggle("hidden", !shouldShowDashboard);
  dashboardHeader?.classList.toggle("hidden", !shouldShowDashboard);
  if (!shouldShowDashboard) return;

  const sales = visibleSalesItems();
  const now = todayDate();
  const today = dateKey(now);
  const yesterday = dateKey(shiftDate(now, -1));
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const todayItems = sales.filter((item) => item.date === today);
  const yesterdayItems = sales.filter((item) => item.date === yesterday);
  const weekItems = sales.filter((item) => isBetweenDates(item.date, weekStart, now));
  const lastWeekItems = sales.filter((item) => isBetweenDates(item.date, shiftDate(weekStart, -7), shiftDate(weekStart, -1)));
  const monthItems = sales.filter((item) => isBetweenDates(item.date, monthStart, now));
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  const lastMonthItems = sales.filter((item) => isBetweenDates(item.date, lastMonthStart, lastMonthEnd));
  const todayAmount = sumSales(todayItems);
  const yesterdayAmount = sumSales(yesterdayItems);
  const weekAmount = sumSales(weekItems);
  const lastWeekAmount = sumSales(lastWeekItems);
  const monthAmount = sumSales(monthItems);
  const lastMonthAmount = sumSales(lastMonthItems);
  const dayGoalRate = goalRate(todayAmount, salesGoals.day);
  const yesterdayGoalRate = goalRate(yesterdayAmount, salesGoals.day);
  const monthRate = goalRate(monthAmount, salesGoals.month);
  const elapsedDays = now.getDate();
  const monthDays = monthEnd.getDate();
  const timeRate = Math.round((elapsedDays / monthDays) * 100);

  document.querySelector("#todayLabel").textContent = `今日（${today}）`;
  document.querySelector("#todayAmount").textContent = formatWan(todayAmount);
  document.querySelector("#todayGoal").textContent = `（目标: ${formatWan(salesGoals.day)}）`;
  document.querySelector("#todayRate").textContent = `${dayGoalRate}%`;
  document.querySelector("#todayMeta").textContent = "定金: 0.00万　退款: 0.00万";
  renderBadges("#todayBadges", [
    { label: "环比", value: percentValue(todayAmount, yesterdayAmount) },
    { label: "同比", value: percentValue(todayAmount, yesterdayAmount) }
  ]);

  document.querySelector("#yesterdayLabel").textContent = `昨日（${yesterday}）`;
  document.querySelector("#yesterdayAmount").textContent = formatWan(yesterdayAmount);
  document.querySelector("#yesterdayGoal").textContent = `（目标: ${formatWan(salesGoals.day)}）`;
  document.querySelector("#yesterdayRate").textContent = `${yesterdayGoalRate}%`;
  document.querySelector("#yesterdayMeta").textContent = "定金: 0.00万　退款: 0.00万";
  renderBadges("#yesterdayBadges", [
    { label: "环比", value: percentValue(yesterdayAmount, sumSales(sales.filter((item) => item.date === dateKey(shiftDate(now, -2))))) },
    { label: "同比", value: percentValue(yesterdayAmount, todayAmount) }
  ]);

  document.querySelector("#weekRange").textContent = `统计 ${dateKey(weekStart)}~${today}`;
  document.querySelector("#weekAmount").textContent = formatWan(weekAmount);
  document.querySelector("#weekGoal").textContent = `（目标: ${formatWan(salesGoals.week)}）`;
  document.querySelector("#weekMeta").textContent = "定金: 0.00万　退款: 0.00万";
  renderBadges("#weekBadges", [{ label: "环比", value: percentValue(weekAmount, lastWeekAmount) }]);

  document.querySelector("#monthRange").textContent = `统计 ${dateKey(monthStart)}~${today}`;
  document.querySelector("#monthAmount").textContent = formatWan(monthAmount);
  document.querySelector("#monthGoal").textContent = `（目标: ${formatWan(salesGoals.month)}）`;
  document.querySelector("#monthMeta").textContent = "定金: 0.00万　退款: 0.00万";
  renderBadges("#monthBadges", [{ label: "环比", value: percentValue(monthAmount, lastMonthAmount) }]);
  document.querySelector("#monthProgressText").textContent = `${monthRate}%`;
  document.querySelector("#monthProgressBar").style.setProperty("--progress-width", `${Math.min(monthRate, 100)}%`);
  document.querySelector("#monthTimeText").textContent = `${timeRate}%`;
  document.querySelector("#monthTimeBar").style.setProperty("--progress-width", `${timeRate}%`);

  renderRank("#todayRank", todayItems);
  renderRank("#yesterdayRank", yesterdayItems);
  renderRank("#weekRank", weekItems);
  renderRank("#monthRank", monthItems);
}

function canUse(feature) {
  if (currentRole === "super_admin") return true;
  if (currentUser?.permissions) return Boolean(currentUser.permissions[feature]);
  return Boolean(permissions[currentRole]?.[feature]);
}

function canView(view) {
  return canUse(view);
}

function allowedViews() {
  return ["stock", "sales"].filter((view) => canView(view));
}

function canViewAllData() {
  return currentRole === "super_admin" || currentRole === "manager";
}

function isOwnItem(item) {
  if (!currentUser) return false;
  return item.owner === currentUser.username || item.soldBy === currentUser.username || item.seller === currentUser.username;
}

function roleName(role) {
  return {
    super_admin: "超级管理员",
    manager: "主管",
    employee: "员工"
  }[role] || role;
}

function renderPermissionCheckboxes(container, namePrefix, values = {}) {
  container.innerHTML = featureModules.map((feature) => `
    <label class="permission-chip">
      <input name="${namePrefix}-${feature.key}" type="checkbox" ${values[feature.key] ? "checked" : ""} />
      <span>${feature.label}</span>
    </label>
  `).join("");
}

function readPermissionCheckboxes(namePrefix, form = userForm) {
  return Object.fromEntries(featureModules.map((feature) => [
    feature.key,
    Boolean(form.elements[`${namePrefix}-${feature.key}`]?.checked)
  ]));
}

function renderUsers() {
  const markup = users.map((user) => {
    const isCurrent = currentUser?.username === user.username;
    const isLastAdmin = user.role === "super_admin" && users.filter((entry) => entry.role === "super_admin").length === 1;
    const canDelete = !isCurrent && !isLastAdmin;
    const userPermissions = normalizePermissionSet(user.permissions, user.role);
    const enabledFeatures = featureModules.filter((feature) => userPermissions[feature.key]).map((feature) => feature.label);
    const permissionText = enabledFeatures.length ? enabledFeatures.join(" / ") : "无权限";

    return `
      <article class="user-row">
        <div>
          <strong>${escapeHtml(user.username)}</strong>
          <span>${escapeHtml(roleName(user.role))} · ${escapeHtml(permissionText)}</span>
        </div>
        <div class="user-row-actions">
          <button
            class="link-button"
            data-action="reset-user-password"
            data-username="${escapeHtml(user.username)}"
            type="button"
          >重置密码</button>
          <button
            class="link-button danger"
            data-action="delete-user"
            data-username="${escapeHtml(user.username)}"
            type="button"
            ${canDelete ? "" : "disabled"}
          >删除</button>
        </div>
      </article>
    `;
  }).join("");
  userCount.textContent = `${users.length} 人`;
  userList.innerHTML = markup;
  pageUserCount.textContent = `${users.length} 人`;
  pageUserList.innerHTML = markup;
}

function showApp(user) {
  currentUser = user;
  currentRole = user.role;
  currentView = "";
  currentUserPage = "";
  loginScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
  renderTable();
}

function showLogin() {
  currentUser = null;
  currentRole = "";
  appShell.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

function loadRememberedLogin() {
  const remembered = readStoredJson("sales-demo-remember", null);
  if (!remembered) return;
  loginForm.elements.username.value = cleanText(remembered.username, 40);
  loginForm.elements.password.value = cleanText(remembered.password, 80);
  loginForm.elements.remember.checked = true;
}

function filteredItems() {
  if (!currentView) return [];
  return items
    .filter((item) => (currentView === "stock" ? !item.sold : item.sold))
    .filter((item) => canViewAllData() || isOwnItem(item))
    .sort((a, b) => {
      const aValue = sortKey === "profit" ? profitOf(a) : a[sortKey];
      const bValue = sortKey === "profit" ? profitOf(b) : b[sortKey];
      const direction = sortDir === "asc" ? 1 : -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }
      return String(aValue).localeCompare(String(bValue), "zh-Hans-CN") * direction;
    });
}

function stockForSale() {
  return items
    .filter((item) => !item.sold)
    .filter((item) => canViewAllData() || isOwnItem(item));
}

function uniqueValues(list, key) {
  return [...new Set(list.map((item) => item[key]).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), "zh-Hans-CN"));
}

function fillSelect(select, values, placeholder) {
  select.innerHTML = [
    `<option value="">${escapeHtml(placeholder)}</option>`,
    ...values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
  ].join("");
}

function setFieldMode(fieldName, useSelect) {
  const input = itemForm.elements[fieldName];
  const select = itemForm.elements[`${fieldName}Select`];
  input.classList.toggle("hidden", useSelect);
  select.classList.toggle("hidden", !useSelect);
  input.required = !useSelect;
  select.required = useSelect;
}

function selectedStockItems() {
  const model = itemForm.elements.modelSelect.value;
  const style = itemForm.elements.styleSelect.value;
  return stockForSale()
    .filter((item) => !model || item.model === model)
    .filter((item) => !style || item.style === style);
}

function applySelectedInventoryItem() {
  const vsn = itemForm.elements.vsnSelect.value;
  const item = stockForSale().find((entry) => entry.vsn === vsn);
  if (!item) return;
  itemForm.elements.modelSelect.value = item.model;
  itemForm.elements.styleSelect.value = item.style;
  itemForm.elements.vsnSelect.setCustomValidity("");
  itemForm.elements.model.value = item.model;
  itemForm.elements.style.value = item.style;
  itemForm.elements.vsn.value = item.vsn;
  itemForm.elements.warehouse.value = item.warehouse;
  itemForm.elements.price.value = item.price;
  itemForm.elements.cost.value = item.cost;
}

function refreshSalesPickers() {
  const stock = stockForSale();
  const modelSelect = itemForm.elements.modelSelect;
  const styleSelect = itemForm.elements.styleSelect;
  const vsnSelect = itemForm.elements.vsnSelect;
  const currentModel = modelSelect.value;
  const currentStyle = styleSelect.value;
  const models = uniqueValues(stock, "model");
  fillSelect(modelSelect, models, stock.length ? "请选择型号" : "暂无可售库存");
  modelSelect.value = models.includes(currentModel) ? currentModel : "";

  const styles = uniqueValues(stock.filter((item) => !modelSelect.value || item.model === modelSelect.value), "style");
  fillSelect(styleSelect, styles, modelSelect.value ? "请选择款式" : "请先选择型号");
  styleSelect.value = styles.includes(currentStyle) ? currentStyle : "";

  const candidates = selectedStockItems();
  const vsnOptions = candidates.map((item) => `${item.vsn}｜${item.warehouse}｜成本 ${formatNumber(item.cost)}`);
  vsnSelect.innerHTML = [
    `<option value="">${escapeHtml(candidates.length ? "请选择 VSN" : "暂无匹配库存")}</option>`,
    ...candidates.map((item, index) => `<option value="${escapeHtml(item.vsn)}">${escapeHtml(vsnOptions[index])}</option>`)
  ].join("");
  if (candidates.length === 1) {
    vsnSelect.value = candidates[0].vsn;
    applySelectedInventoryItem();
  } else {
    itemForm.elements.vsn.value = "";
  }
}

function renderMetrics(list) {
  renderUserPage();
  metricsSection.classList.toggle("hidden", !currentView);
  tableZone.classList.toggle("hidden", !currentView);
  document.querySelectorAll('[data-metric="stock"]').forEach((card) => {
    card.classList.toggle("hidden", currentView !== "stock");
  });
  document.querySelectorAll('[data-metric="sales"]').forEach((card) => {
    card.classList.toggle("hidden", currentView !== "sales");
  });
  const soldItems = list.filter((item) => item.sold);
  const unsoldItems = list.filter((item) => !item.sold);
  const stockAmount = unsoldItems.reduce((sum, item) => sum + Number(item.cost || 0), 0);
  const salesTotal = soldItems.reduce((sum, item) => sum + Number(item.salePrice || 0), 0);
  const profitTotal = soldItems.reduce((sum, item) => sum + profitOf(item), 0);
  document.querySelector("#stockCount").textContent = list.length;
  document.querySelector("#stockAmount").textContent = money.format(stockAmount);
  document.querySelector("#soldCount").textContent = soldItems.length;
  document.querySelector("#salesTotal").textContent = money.format(salesTotal);
  document.querySelector("#profitTotal").textContent = money.format(profitTotal);
  document.querySelector("#resultCount").textContent = currentView ? `${list.length} 条记录` : "无权限访问";
}

function applySale(item, salePrice, seller) {
  return {
    ...item,
    sold: true,
    salePrice: cleanMoney(salePrice),
    seller: cleanText(seller, 40),
    soldBy: currentUser?.username || "",
    owner: item.owner || currentUser?.username || ""
  };
}

function renderPermissionState() {
  currentUserLabel.textContent = currentUser ? `${currentUser.username} / ${roleName(currentRole)}` : "未登录";
  userNavSection.hidden = !canUse("userManage");
  if (currentUserPage && !canUse("userManage")) currentUserPage = "";
  document.querySelector("#resetButton").hidden = !canUse("refreshPage");
  document.querySelector("#importButton").hidden = !canUse("importData");
  document.querySelector("#exportButton").hidden = !canUse("exportData");

  const views = allowedViews();
  salesNavSection.hidden = views.length === 0;
  if (currentView && !views.includes(currentView)) currentView = "";

  viewButtons.forEach((button) => {
    const view = button.dataset.view;
    button.hidden = !canView(view);
    button.classList.toggle("active", view === currentView);
  });
  companyPerformanceButton.classList.toggle("active", !currentView && !currentUserPage);
  userSectionTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.userPage === currentUserPage);
  });

  addStockButton.hidden = !currentView || (currentView === "sales" ? !canUse("addSales") : !canUse("addStock"));
  addStockButton.textContent = currentView === "sales" ? "新增销售" : "新增库存";
}

function prepareStockDialog() {
  const isSalesView = currentView === "sales";
  stockDialog.querySelector(".dialog-head strong").textContent = isSalesView ? "新增销售" : "新增库存";
  stockSubmitButton.textContent = isSalesView ? "添加到销售" : "添加到库存";
  ["model", "style", "vsn"].forEach((field) => setFieldMode(field, isSalesView));
  itemForm.querySelector(".sales-only-field").classList.toggle("hidden", !isSalesView);
  itemForm.elements.salePrice.required = isSalesView;
  itemForm.elements.seller.required = isSalesView;
  itemForm.elements.seller.value = isSalesView ? currentUser?.username || "" : "";
  if (isSalesView) {
    refreshSalesPickers();
    itemForm.elements.price.readOnly = true;
    itemForm.elements.cost.readOnly = true;
  } else {
    itemForm.elements.price.readOnly = false;
    itemForm.elements.cost.readOnly = false;
  }
}

function renderTable() {
  renderPermissionState();
  const list = filteredItems();
  renderPerformanceDashboard();
  renderMetrics(list);
  tableBody.innerHTML = "";
  tableFoot.innerHTML = "";

  list.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(item.date.replaceAll("-", "/"))}</td>
      <td>${escapeHtml(item.model)}</td>
      <td>${escapeHtml(item.style)}</td>
      <td>${escapeHtml(item.vsn)}</td>
      <td>${escapeHtml(item.warehouse)}</td>
      <td>${formatNumber(item.price)}</td>
      <td>${formatNumber(item.cost)}</td>
      <td>
        <span class="sold-status ${item.sold ? "sold" : "unsold"}">${item.sold ? "是" : "否"}</span>
      </td>
      <td>${item.sold ? formatNumber(item.salePrice) : ""}</td>
      <td>${item.sold ? formatNumber(profitOf(item)) : ""}</td>
      <td>${escapeHtml(item.seller || "")}</td>
      <td>
        ${canUse("sellItem") ? `<button class="link-button" data-action="sell" data-id="${item.id}">${item.sold ? "修改" : "售卖"}</button>` : ""}
        ${canUse("deleteItem") ? `<button class="link-button danger" data-action="remove" data-id="${item.id}">删除</button>` : ""}
      </td>
    `;
    tableBody.append(row);
  });

  if (currentView === "sales") {
    const salesTotal = list.reduce((sum, item) => sum + Number(item.salePrice || 0), 0);
    const profitTotal = list.reduce((sum, item) => sum + profitOf(item), 0);
    tableFoot.innerHTML = `
      <tr class="summary-row">
        <td colspan="7">总计</td>
        <td>${list.length} 件</td>
        <td>${formatNumber(salesTotal)}</td>
        <td>${formatNumber(profitTotal)}</td>
        <td colspan="2"></td>
      </tr>
    `;
  }
}

function openSaleDialog(id) {
  const item = items.find((entry) => entry.id === id);
  if (!item) return;
  saleForm.elements.id.value = item.id;
  saleForm.elements.salePrice.value = item.salePrice || "";
  saleForm.elements.seller.value = item.seller || currentUser?.username || "";
  saleDialog.showModal();
}

function exportCsv() {
  const headers = ["日期", "型号", "款式", "VSN", "库存仓库", "原价", "成本", "售卖", "售卖价", "利润", "销售员"];
  const rows = filteredItems().map((item) => [
    item.date,
    item.model,
    item.style,
    item.vsn,
    item.warehouse,
    item.price,
    item.cost,
    item.sold ? "是" : "否",
    item.sold ? item.salePrice : "",
    item.sold ? profitOf(item) : "",
    item.seller
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "销售库存明细.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  const source = text.replace(/^\ufeff/, "");

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  return rows;
}

function toNumber(value) {
  return Number(String(value || "").replace(/[¥,\s]/g, "")) || 0;
}

function importCsv(file) {
  if (!canUse("importData")) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const rows = parseCsv(String(reader.result || ""));
    const headers = rows[0] || [];
    const headerMap = new Map(headers.map((header, index) => [header.trim(), index]));
    const getCell = (row, name) => row[headerMap.get(name)] || "";
    if (!headerMap.has("VSN") || !headerMap.has("日期")) {
      window.alert("导入失败：CSV 需要包含 日期 和 VSN 列");
      importInput.value = "";
      return;
    }
    items = rows.slice(1).map((row, index) => {
      const soldText = getCell(row, "售卖").trim();
      const sold = soldText === "是" || soldText.toLowerCase() === "yes";
      return normalizeItem({
        id: Date.now() + index,
        date: getCell(row, "日期").trim().replaceAll("/", "-"),
        model: getCell(row, "型号").trim(),
        style: getCell(row, "款式").trim(),
        vsn: getCell(row, "VSN").trim(),
        warehouse: getCell(row, "库存仓库").trim() || "成都",
        price: toNumber(getCell(row, "原价")),
        cost: toNumber(getCell(row, "成本")),
        sold,
        salePrice: sold ? toNumber(getCell(row, "售卖价")) : 0,
        seller: sold ? (getCell(row, "销售员") || getCell(row, "销售人")).trim() : "",
        owner: currentUser?.username || "",
        soldBy: sold ? currentUser?.username || "" : ""
      }, index);
    }).filter((item) => item.date && item.vsn);
    save();
    renderTable();
    importInput.value = "";
  });
  reader.readAsText(file, "utf-8");
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!canView(button.dataset.view)) return;
    currentView = button.dataset.view;
    currentUserPage = "";
    renderTable();
  });
});

companyPerformanceButton.addEventListener("click", () => {
  currentView = "";
  currentUserPage = "";
  renderTable();
});

salesMenuToggle.addEventListener("click", () => {
  const expanded = salesNavSection.classList.toggle("expanded");
  salesMenuToggle.setAttribute("aria-expanded", String(expanded));
  salesMenuPanel.classList.toggle("collapsed", !expanded);
});

userMenuToggle.addEventListener("click", () => {
  const expanded = userNavSection.classList.toggle("expanded");
  userMenuToggle.setAttribute("aria-expanded", String(expanded));
  userMenuPanel.classList.toggle("collapsed", !expanded);
});

function fillPermissionForm() {
  renderPermissionCheckboxes(newUserPermissions, "new", normalizePermissionSet(defaultRolePermissions.employee, "employee"));
  renderPermissionCheckboxes(managerPermissions, "manager", normalizePermissionSet(permissions.manager, "manager"));
  renderPermissionCheckboxes(employeePermissions, "employee", normalizePermissionSet(permissions.employee, "employee"));
}

function fillPagePermissionForms() {
  renderPermissionCheckboxes(pageNewUserPermissions, "pageNew", normalizePermissionSet(defaultRolePermissions.employee, "employee"));
  renderPermissionCheckboxes(pageManagerPermissions, "pageManager", normalizePermissionSet(permissions.manager, "manager"));
  renderPermissionCheckboxes(pageEmployeePermissions, "pageEmployee", normalizePermissionSet(permissions.employee, "employee"));
}

function renderUserPage() {
  const isUserPage = Boolean(currentUserPage);
  userManagementPage.classList.toggle("hidden", !isUserPage);
  if (!isUserPage) return;

  const pageId = userPageMeta[currentUserPage] ? currentUserPage : "userListPage";
  currentUserPage = pageId;
  userPageTitle.textContent = userPageMeta[pageId].title;
  userPageSubtitle.textContent = userPageMeta[pageId].subtitle;
  userPageSections.forEach((section) => {
    section.classList.toggle("hidden", section.id !== pageId);
  });
}

function showUserPage(pageId = "userListPage") {
  if (!canUse("userManage")) return;
  currentView = "";
  currentUserPage = userPageMeta[pageId] ? pageId : "userListPage";
  userNavSection.classList.add("expanded");
  userMenuToggle.setAttribute("aria-expanded", "true");
  userMenuPanel.classList.remove("collapsed");
  fillPagePermissionForms();
  renderUsers();
  renderTable();
}

function setControlGroupDisabled(container, disabled) {
  container.querySelectorAll("input, select, textarea, button").forEach((control) => {
    control.disabled = disabled;
  });
}

function setUserDialogSection(sectionId) {
  userDialogSection = sectionId;
  const sections = ["userListSection", "addUserSection", "permissionManageSection"];
  sections.forEach((id) => {
    const section = document.querySelector(`#${id}`);
    const active = id === sectionId;
    section?.classList.toggle("hidden", !active);
    if (section) setControlGroupDisabled(section, !active);
  });
  document.querySelectorAll("[data-user-section]").forEach((button) => {
    button.classList.toggle("active", button.dataset.userSection === sectionId);
  });

  const labels = {
    userListSection: "仅查看",
    addUserSection: "保存用户",
    permissionManageSection: "保存权限"
  };
  userSubmitButton.textContent = labels[sectionId] || "保存";
  userSubmitButton.hidden = sectionId === "userListSection";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginForm.elements.username.value.trim();
  const password = loginForm.elements.password.value.trim();
  const user = users.find((entry) => entry.username === username && entry.password === password);
  if (!user) {
    loginError.textContent = "账号或密码不正确";
    return;
  }
  loginError.textContent = "";
  if (loginForm.elements.remember.checked) {
    localStorage.setItem("sales-demo-remember", JSON.stringify({ username, password }));
  } else {
    localStorage.removeItem("sales-demo-remember");
  }
  localStorage.setItem("sales-demo-login-user", username);
  showApp(user);
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("sales-demo-login-user");
  showLogin();
});

function openUserManager(sectionId = "userListSection") {
  if (!canUse("userManage")) return;
  userForm.reset();
  fillPermissionForm();
  renderUsers();
  setUserDialogSection(sectionId);
  userDialog.showModal();
}

userSectionTabs.forEach((button) => {
  button.addEventListener("click", () => {
    showUserPage(button.dataset.userPage);
  });
});

userForm.querySelectorAll(".user-module-tabs [data-user-section]").forEach((button) => {
  button.addEventListener("click", () => {
    setUserDialogSection(button.dataset.userSection);
  });
});

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (userDialogSection === "permissionManageSection") {
    permissions = {
      super_admin: { ...allFeaturePermissions },
      manager: readPermissionCheckboxes("manager"),
      employee: readPermissionCheckboxes("employee")
    };
    savePermissions();
    renderTable();
    return;
  }

  if (userDialogSection !== "addUserSection") return;

  const username = cleanText(userForm.elements.username.value, 40);
  if (users.some((user) => user.username === username)) {
    userForm.elements.username.setCustomValidity("账号已存在");
    userForm.reportValidity();
    return;
  }
  userForm.elements.username.setCustomValidity("");
  users.push(normalizeUser({
    username,
    password: userForm.elements.password.value,
    role: userForm.elements.role.value,
    permissions: readPermissionCheckboxes("new")
  }));
  saveUsers();
  userForm.reset();
  fillPermissionForm();
  renderUsers();
  renderTable();
  setUserDialogSection("userListSection");
});

function handleUserListAction(event) {
  const deleteButton = event.target.closest('[data-action="delete-user"]');
  const resetButton = event.target.closest('[data-action="reset-user-password"]');
  if (resetButton) {
    const username = resetButton.dataset.username;
    users = users.map((entry) => entry.username === username ? { ...entry, password: "123456" } : entry);
    saveUsers();
    renderUsers();
    window.alert(`${username} 的密码已重置为 123456`);
    return;
  }

  if (!deleteButton) return;
  const username = deleteButton.dataset.username;
  const user = users.find((entry) => entry.username === username);
  if (!user || username === currentUser?.username) return;
  const isLastAdmin = user.role === "super_admin" && users.filter((entry) => entry.role === "super_admin").length === 1;
  if (isLastAdmin) return;
  users = users.filter((entry) => entry.username !== username);
  saveUsers();
  if (localStorage.getItem("sales-demo-login-user") === username) {
    localStorage.removeItem("sales-demo-login-user");
  }
  const remembered = readStoredJson("sales-demo-remember", null);
  if (remembered?.username === username) {
    localStorage.removeItem("sales-demo-remember");
  }
  renderUsers();
  renderTable();
}

userForm.addEventListener("click", (event) => {
  const closeButton = event.target.closest('[data-action="close-user-dialog"]');
  if (closeButton) {
    userDialog.close();
    return;
  }
  handleUserListAction(event);
});

pageUserList.addEventListener("click", handleUserListAction);

addUserPageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = cleanText(addUserPageForm.elements.pageUsername.value, 40);
  if (users.some((user) => user.username === username)) {
    addUserPageForm.elements.pageUsername.setCustomValidity("账号已存在");
    addUserPageForm.reportValidity();
    return;
  }
  addUserPageForm.elements.pageUsername.setCustomValidity("");
  users.push(normalizeUser({
    username,
    password: addUserPageForm.elements.pagePassword.value,
    role: addUserPageForm.elements.pageRole.value,
    permissions: readPermissionCheckboxes("pageNew", addUserPageForm)
  }));
  saveUsers();
  addUserPageForm.reset();
  fillPagePermissionForms();
  renderUsers();
  showUserPage("userListPage");
});

permissionsPageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  permissions = {
    super_admin: { ...allFeaturePermissions },
    manager: readPermissionCheckboxes("pageManager", permissionsPageForm),
    employee: readPermissionCheckboxes("pageEmployee", permissionsPageForm)
  };
  savePermissions();
  renderTable();
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(itemForm);
  const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
  const isSalesView = currentView === "sales";
  if (isSalesView ? !canUse("addSales") : !canUse("addStock")) return;
  const vsn = cleanText(isSalesView ? formData.get("vsnSelect") : formData.get("vsn"), 40);
  const salePrice = isSalesView ? cleanMoney(formData.get("salePrice")) : 0;
  const seller = isSalesView ? cleanText(formData.get("seller"), 40) : "";
  const inventoryItem = isSalesView ? items.find((item) => !item.sold && item.vsn === vsn) : null;

  if (isSalesView && !inventoryItem) {
    itemForm.elements.vsnSelect.setCustomValidity("请选择库存中已有的 VSN");
    itemForm.reportValidity();
    return;
  }

  if (inventoryItem) {
    items = items.map((item) => {
      if (item.id !== inventoryItem.id) return item;
      return applySale(item, salePrice, seller);
    });
  } else {
    items = [
      normalizeItem({
        id: nextId,
        date: formData.get("date"),
        model: formData.get("model"),
        style: formData.get("style"),
        vsn,
        warehouse: formData.get("warehouse"),
        price: formData.get("price"),
        cost: formData.get("cost"),
        sold: isSalesView,
        salePrice,
        seller,
        owner: currentUser?.username || "",
        soldBy: isSalesView ? currentUser?.username || "" : ""
      }),
      ...items
    ];
  }
  itemForm.reset();
  itemForm.elements.date.value = dateKey(todayDate());
  stockDialog.close();
  save();
  renderTable();
});

addStockButton.addEventListener("click", () => {
  if (currentView === "sales" ? !canUse("addSales") : !canUse("addStock")) return;
  itemForm.reset();
  itemForm.elements.date.value = dateKey(todayDate());
  prepareStockDialog();
  stockDialog.showModal();
});

itemForm.addEventListener("click", (event) => {
  const closeButton = event.target.closest('[data-action="close-stock-dialog"]');
  if (!closeButton) return;
  itemForm.elements.salePrice.required = false;
  itemForm.elements.seller.required = false;
  ["model", "style", "vsn"].forEach((field) => setFieldMode(field, false));
  stockDialog.close();
});

itemForm.elements.modelSelect.addEventListener("change", () => {
  itemForm.elements.styleSelect.value = "";
  refreshSalesPickers();
});

itemForm.elements.styleSelect.addEventListener("change", refreshSalesPickers);

itemForm.elements.vsnSelect.addEventListener("change", () => {
  itemForm.elements.vsnSelect.setCustomValidity("");
  applySelectedInventoryItem();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "sell") {
    if (!canUse("sellItem")) return;
    openSaleDialog(id);
  }
  if (button.dataset.action === "remove") {
    if (!canUse("deleteItem")) return;
    items = items.filter((item) => item.id !== id);
    save();
    renderTable();
  }
});

saleForm.addEventListener("submit", (event) => {
  if (event.submitter?.value !== "confirm") return;
  event.preventDefault();
  if (!canUse("sellItem")) return;
  const id = Number(saleForm.elements.id.value);
  const salePrice = cleanMoney(saleForm.elements.salePrice.value);
  const seller = cleanText(saleForm.elements.seller.value, 40);
  items = items.map((item) => {
    if (item.id !== id) return item;
    return applySale(item, salePrice, seller);
  });
  save();
  saleDialog.close();
  renderTable();
});

saleForm.addEventListener("click", (event) => {
  const closeButton = event.target.closest('[data-action="close-sale-dialog"]');
  if (!closeButton) return;
  saleDialog.close();
});

saleDialog.addEventListener("close", () => {
  renderTable();
});

document.querySelector("#resetButton").addEventListener("click", () => {
  if (!canUse("refreshPage")) return;
  const button = document.querySelector("#resetButton");
  button.textContent = "刷新中";
  button.disabled = true;
  setTimeout(() => {
    window.location.reload();
  }, 150);
});

document.querySelector("#importButton").addEventListener("click", () => {
  importInput.click();
});

importInput.addEventListener("change", () => {
  const file = importInput.files[0];
  if (!file) return;
  importCsv(file);
});

document.querySelector("#exportButton").addEventListener("click", () => {
  if (!canUse("exportData")) return;
  exportCsv();
});

normalizePermissions();
mergeDefaultUsers();
loadRememberedLogin();
const lastLoginUser = localStorage.getItem("sales-demo-login-user");
const savedUser = users.find((user) => user.username === lastLoginUser);
if (savedUser) {
  showApp(savedUser);
} else {
  showLogin();
}
