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

let items = JSON.parse(localStorage.getItem("sales-demo-items") || "null") || seedItems;
let sortKey = "date";
let sortDir = "desc";
let currentView = "stock";
let users = JSON.parse(localStorage.getItem("sales-demo-users") || "null") || [
  { username: "admin", password: "admin123", role: "super_admin", permissions: { stock: true, sales: true } },
  { username: "manager", password: "123456", role: "manager" },
  { username: "employee", password: "123456", role: "employee" }
];
let currentUser = null;
let currentRole = "";
let permissions = JSON.parse(localStorage.getItem("sales-demo-permissions") || "null") || {
  super_admin: { stock: true, sales: true },
  manager: { stock: true, sales: true },
  employee: { stock: true, sales: false }
};

const appShell = document.querySelector(".app-shell");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const tableBody = document.querySelector("#tableBody");
const viewButtons = document.querySelectorAll(".view-tab");
const currentUserLabel = document.querySelector("#currentUserLabel");
const addUserButton = document.querySelector("#addUserButton");
const logoutButton = document.querySelector("#logoutButton");
const userDialog = document.querySelector("#userDialog");
const userForm = document.querySelector("#userForm");
const userList = document.querySelector("#userList");
const userCount = document.querySelector("#userCount");
const itemForm = document.querySelector("#itemForm");
const stockDialog = document.querySelector("#stockDialog");
const addStockButton = document.querySelector("#addStockButton");
const stockSubmitButton = document.querySelector("#stockSubmitButton");
const saleDialog = document.querySelector("#saleDialog");
const saleForm = document.querySelector("#saleForm");
const importInput = document.querySelector("#importInput");

const money = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 1
});

function save() {
  localStorage.setItem("sales-demo-items", JSON.stringify(items));
}

function savePermissions() {
  localStorage.setItem("sales-demo-permissions", JSON.stringify(permissions));
}

function saveUsers() {
  localStorage.setItem("sales-demo-users", JSON.stringify(users));
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("zh-CN", { maximumFractionDigits: 1 });
}

function profitOf(item) {
  return item.sold ? Number(item.salePrice || 0) - Number(item.cost || 0) : 0;
}

function canView(view) {
  if (currentRole === "super_admin") return true;
  if (currentUser?.permissions) return Boolean(currentUser.permissions[view]);
  return Boolean(permissions[currentRole]?.[view]);
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

function renderUsers() {
  userCount.textContent = `${users.length} 人`;
  userList.innerHTML = users.map((user) => {
    const isCurrent = currentUser?.username === user.username;
    const isLastAdmin = user.role === "super_admin" && users.filter((entry) => entry.role === "super_admin").length === 1;
    const canDelete = !isCurrent && !isLastAdmin;
    const stockText = user.permissions?.stock ?? permissions[user.role]?.stock ? "库存" : "";
    const salesText = user.permissions?.sales ?? permissions[user.role]?.sales ? "销售" : "";
    const permissionText = [stockText, salesText].filter(Boolean).join(" / ") || "无权限";

    return `
      <article class="user-row">
        <div>
          <strong>${user.username}</strong>
          <span>${roleName(user.role)} · ${permissionText}</span>
        </div>
        <button
          class="link-button danger"
          data-action="delete-user"
          data-username="${user.username}"
          type="button"
          ${canDelete ? "" : "disabled"}
        >删除</button>
      </article>
    `;
  }).join("");
}

function showApp(user) {
  currentUser = user;
  currentRole = user.role;
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
  const remembered = JSON.parse(localStorage.getItem("sales-demo-remember") || "null");
  if (!remembered) return;
  loginForm.elements.username.value = remembered.username || "";
  loginForm.elements.password.value = remembered.password || "";
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

function renderMetrics(list) {
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

function renderPermissionState() {
  currentUserLabel.textContent = currentUser ? `${currentUser.username} / ${roleName(currentRole)}` : "未登录";
  addUserButton.hidden = currentRole !== "super_admin";

  const views = allowedViews();
  if (!views.includes(currentView)) currentView = views[0] || "";

  viewButtons.forEach((button) => {
    const view = button.dataset.view;
    button.hidden = !canView(view);
    button.classList.toggle("active", view === currentView);
  });

  addStockButton.hidden = !currentView || !canView(currentView);
  addStockButton.textContent = currentView === "sales" ? "新增销售" : "新增库存";
}

function prepareStockDialog() {
  const isSalesView = currentView === "sales";
  stockDialog.querySelector(".dialog-head strong").textContent = isSalesView ? "新增销售" : "新增库存";
  stockSubmitButton.textContent = isSalesView ? "添加到销售" : "添加到库存";
  itemForm.querySelector(".sales-only-field").classList.toggle("hidden", !isSalesView);
  itemForm.elements.salePrice.required = isSalesView;
  itemForm.elements.seller.required = isSalesView;
  itemForm.elements.seller.value = isSalesView ? currentUser?.username || "" : "";
}

function renderTable() {
  renderPermissionState();
  const list = filteredItems();
  renderMetrics(list);
  tableBody.innerHTML = "";

  list.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date.replaceAll("-", "/")}</td>
      <td>${item.model}</td>
      <td>${item.style}</td>
      <td>${item.vsn}</td>
      <td>${item.warehouse}</td>
      <td>${formatNumber(item.price)}</td>
      <td>${formatNumber(item.cost)}</td>
      <td>
        <select class="sold-select" data-action="sold-status" data-id="${item.id}" ${item.sold ? "" : "disabled"}>
          <option value="yes" ${item.sold ? "selected" : ""}>是</option>
          <option value="no" ${!item.sold ? "selected" : ""}>否</option>
        </select>
      </td>
      <td>${item.sold ? formatNumber(item.salePrice) : ""}</td>
      <td>${item.sold ? formatNumber(profitOf(item)) : ""}</td>
      <td>${item.seller || ""}</td>
      <td>
        <button class="link-button" data-action="sell" data-id="${item.id}">${item.sold ? "修改" : "售卖"}</button>
        <button class="link-button danger" data-action="remove" data-id="${item.id}">删除</button>
      </td>
    `;
    tableBody.append(row);
  });
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
  const headers = ["日期", "型号", "款式", "VSN", "库存仓库", "原价", "成本", "售卖", "售卖价", "利润", "销售人"];
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
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const rows = parseCsv(String(reader.result || ""));
    const headers = rows[0] || [];
    const headerMap = new Map(headers.map((header, index) => [header.trim(), index]));
    const getCell = (row, name) => row[headerMap.get(name)] || "";
    items = rows.slice(1).map((row, index) => {
      const soldText = getCell(row, "售卖").trim();
      const sold = soldText === "是" || soldText.toLowerCase() === "yes";
      return {
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
        seller: sold ? getCell(row, "销售人").trim() : "",
        owner: currentUser?.username || "",
        soldBy: sold ? currentUser?.username || "" : ""
      };
    });
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
    renderTable();
  });
});

function fillPermissionForm() {
  userForm.elements["manager-stock"].checked = Boolean(permissions.manager?.stock);
  userForm.elements["manager-sales"].checked = Boolean(permissions.manager?.sales);
  userForm.elements["employee-stock"].checked = Boolean(permissions.employee?.stock);
  userForm.elements["employee-sales"].checked = Boolean(permissions.employee?.sales);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginForm.elements.username.value.trim();
  const password = loginForm.elements.password.value;
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

addUserButton.addEventListener("click", () => {
  userForm.reset();
  userForm.elements.stock.checked = true;
  userForm.elements.sales.checked = false;
  fillPermissionForm();
  renderUsers();
  userDialog.showModal();
});

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = userForm.elements.username.value.trim();
  if (users.some((user) => user.username === username)) {
    userForm.elements.username.setCustomValidity("账号已存在");
    userForm.reportValidity();
    return;
  }
  userForm.elements.username.setCustomValidity("");
  users.push({
    username,
    password: userForm.elements.password.value,
    role: userForm.elements.role.value,
    permissions: {
      stock: userForm.elements.stock.checked,
      sales: userForm.elements.sales.checked
    }
  });
  saveUsers();
  permissions = {
    super_admin: { stock: true, sales: true },
    manager: {
      stock: userForm.elements["manager-stock"].checked,
      sales: userForm.elements["manager-sales"].checked
    },
    employee: {
      stock: userForm.elements["employee-stock"].checked,
      sales: userForm.elements["employee-sales"].checked
    }
  };
  savePermissions();
  userForm.reset();
  userForm.elements.stock.checked = true;
  userForm.elements.sales.checked = false;
  fillPermissionForm();
  renderUsers();
  renderTable();
});

userForm.addEventListener("click", (event) => {
  const closeButton = event.target.closest('[data-action="close-user-dialog"]');
  if (closeButton) {
    userDialog.close();
    return;
  }

  const deleteButton = event.target.closest('[data-action="delete-user"]');
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
  const remembered = JSON.parse(localStorage.getItem("sales-demo-remember") || "null");
  if (remembered?.username === username) {
    localStorage.removeItem("sales-demo-remember");
  }
  renderUsers();
  renderTable();
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(itemForm);
  const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
  const isSalesView = currentView === "sales";
  items = [
    {
      id: nextId,
      date: formData.get("date"),
      model: formData.get("model").trim(),
      style: formData.get("style").trim(),
      vsn: formData.get("vsn").trim(),
      warehouse: formData.get("warehouse").trim(),
      price: Number(formData.get("price")),
      cost: Number(formData.get("cost")),
      sold: isSalesView,
      salePrice: isSalesView ? Number(formData.get("salePrice")) : 0,
      seller: isSalesView ? formData.get("seller").trim() : "",
      owner: currentUser?.username || "",
      soldBy: isSalesView ? currentUser?.username || "" : ""
    },
    ...items
  ];
  itemForm.reset();
  itemForm.elements.date.value = "2026-07-05";
  stockDialog.close();
  save();
  renderTable();
});

addStockButton.addEventListener("click", () => {
  itemForm.reset();
  itemForm.elements.date.value = "2026-07-05";
  prepareStockDialog();
  stockDialog.showModal();
});

itemForm.addEventListener("click", (event) => {
  const closeButton = event.target.closest('[data-action="close-stock-dialog"]');
  if (!closeButton) return;
  itemForm.elements.salePrice.required = false;
  itemForm.elements.seller.required = false;
  stockDialog.close();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "sell") {
    openSaleDialog(id);
  }
  if (button.dataset.action === "remove") {
    items = items.filter((item) => item.id !== id);
    save();
    renderTable();
  }
});

tableBody.addEventListener("change", (event) => {
  const select = event.target.closest('select[data-action="sold-status"]');
  if (!select) return;
  const id = Number(select.dataset.id);
  if (select.value === "yes") {
    openSaleDialog(id);
    return;
  }
  items = items.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      sold: false,
      salePrice: 0,
      seller: ""
    };
  });
  save();
  renderTable();
});

saleForm.addEventListener("submit", (event) => {
  if (event.submitter.value !== "confirm") return;
  event.preventDefault();
  const id = Number(saleForm.elements.id.value);
  items = items.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      sold: true,
      salePrice: Number(saleForm.elements.salePrice.value),
      seller: saleForm.elements.seller.value.trim(),
      soldBy: currentUser?.username || "",
      owner: item.owner || currentUser?.username || ""
    };
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

document.querySelector("#exportButton").addEventListener("click", exportCsv);

loadRememberedLogin();
const lastLoginUser = localStorage.getItem("sales-demo-login-user");
const savedUser = users.find((user) => user.username === lastLoginUser);
if (savedUser) {
  showApp(savedUser);
} else {
  showLogin();
}
