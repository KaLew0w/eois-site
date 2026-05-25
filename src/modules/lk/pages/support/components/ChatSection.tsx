export const ChatSection: React.FC = () => {
    return (
    
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="bg-[#1A1A1A]/90 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 card-emboss">
            <div className="text-base sm:text-lg font-medium">Чат с поддержкой</div>
            <div className="mt-2 text-white/60 text-sm">Онлайн ежедневно 09:00–21:00 GMT+6. Вне часов — ответим на e-mail.</div>
  
            <div id="chatBox" className="mt-3 bg-white/5 border border-white/10 rounded-xl p-3 h-[52vh] min-h-[320px] overflow-y-auto hide-scroll">
              
        <div className="flex  mb-2">
          <div className="max-w-[85%] rounded-xl px-3 py-2 bg-white/10">
            <div className="text-sm">Здравствуйте! Чем можем помочь?</div>
            <div className="text-[11px] opacity-70 mt-0.5">20.08.2025, 16:05:00</div>
          </div>
        </div>
        <div className="flex justify-end mb-2">
          <div className="max-w-[85%] rounded-xl px-3 py-2 bg-[#00eefd] text-black">
            <div className="text-sm">dssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</div>
            <div className="text-[11px] opacity-70 mt-0.5">20.10.2025, 16:23:08</div>
          </div>
        </div>
            </div>
  
            <div className="mt-3 grid sm:grid-cols-[1fr,auto] gap-2">
              <textarea id="chatInput" placeholder="Опишите вопрос…" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"/>
              <button id="chatSend" className="px-4 py-2 rounded-xl cta-button">Отправить</button>
            </div>
            <div className="mt-2 text-xs text-white/50">Подсказка: для срочных финансовых вопросов укажите номер карты/кошелька и сумму (без CVV).</div>
          </div>
        </div>
    );
  };
  