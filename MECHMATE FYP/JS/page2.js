let selectedCar = null;

        function selectCar(carType, icon, name) {
            // Remove selection from all cards
            document.querySelectorAll('.car-card').forEach(card => {
                card.classList.remove('selected', 'selecting');
            });

            document.querySelectorAll('.select-button').forEach(button => {
                button.classList.remove('selected');
                button.textContent = button.textContent.replace('Selected!', `Select ${button.textContent.split(' ')[1]}`);
            });

            // Add selecting animation
            const selectedCard = event.currentTarget;
            selectedCard.classList.add('selecting');

            // After animation, add selected state
            setTimeout(() => {
                selectedCard.classList.remove('selecting');
                selectedCard.classList.add('selected');
                
                const button = selectedCard.querySelector('.select-button');
                button.classList.add('selected');
                button.textContent = 'Selected!';

                // Update selected car info
                selectedCar = { type: carType, icon: icon, name: name };
                
                document.getElementById('selectedIcon').textContent = icon;
                document.getElementById('selectedCarName').textContent = name;

                // Show continue section
                document.getElementById('continueSection').classList.add('show');
            }, 150);
        }

        function continueToCustomization() {
            if (!selectedCar) {
                alert('Please select a car model first!');
                return;
            }

            // Show loading state
            document.querySelector('.continue-button').innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 1rem; height: 1rem; border: 2px solid #ffffff40; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    Loading Studio...
                </div>
            `;

            // Add CSS for loading animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            // Simulate navigation (replace with actual routing)
            setTimeout(() => {
               result = `🎨 Ready to redirect to Customization Studio!\n\nSelected: ${selectedCar.name} ${selectedCar.icon}\n\nThis would navigate to your main customization page.`;
                window.location.href = `../html/page3.html`;
            }, 1500);
        }

        function goBack() {
            const confirmBack = confirm('Are you sure you want to go back? Your selection will be lost.');
            if (confirmBack) {
                 window.location.href = '../HTML/index.html';
                // Or React Router: navigate('/');
            }
        }

        // Add some initial animations
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.car-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && selectedCar) {
                continueToCustomization();
            } else if (e.key === 'Escape') {
                goBack();
            }
        });
        
        const modelData = {
      honda: [
        { name: "2008", image: "../CAR IMAGES/SelectionPage/honda_2008.jpg" },
        { name: "2008", image: "../CAR IMAGES/SelectionPage/honda_2008.jpg" },
        { name: "2008", image: "../CAR IMAGES/SelectionPage/honda_2008.jpg" },
        { name: "2008", image: "../CAR IMAGES/SelectionPage/honda_2008.jpg" }
      ],
      corolla: [
        { name: "2007", image: "../CAR IMAGES/SelectionPage/corolla_2007.jpg" },
        { name: "2007", image: "../CAR IMAGES/SelectionPage/corolla_2007.jpg" },
        { name: "2007", image: "../CAR IMAGES/SelectionPage/corolla_2007.jpg" },
        { name: "2007", image: "../CAR IMAGES/SelectionPage/corolla_2007.jpg" }
      ],
      alto: [
        { name: "2014", image: "../CAR IMAGES/SelectionPage/alto_2014.jpg" },
        { name: "2014", image: "../CAR IMAGES/SelectionPage/alto_2014.jpg" },
        { name: "2014", image: "../CAR IMAGES/SelectionPage/alto_2014.jpg" }
      ],
      audi: [
        { name: "2015", image: "../CAR IMAGES/SelectionPage/audi_2015.jpg" },
        { name: "2015", image: "../CAR IMAGES/SelectionPage/audi_2015.jpg" },
        { name: "2015", image: "../CAR IMAGES/SelectionPage/audi_2015.jpg" }
      ]
    };

    function openModels(car) {
      const panel = document.getElementById('modelPanel');
      const list = document.getElementById('modelList');
      const title = document.getElementById('panelTitle');

      // Reset panel
      list.innerHTML = "";
      title.innerText = "Select " + car.toUpperCase() + " Model";

      // Add models with images
      modelData[car].forEach(model => {
        const div = document.createElement("div");
        div.classList.add("model-item");
        div.innerHTML = `
          <img src="${model.image}" alt="${model.name}" >
          <span>${car.toUpperCase()} ${model.name}</span>
        `;
        div.onclick = () => {
          window.location.href = `page3.html?car=${car}&model=${model.name}`;;
        };
        list.appendChild(div);
      });

      // Show panel
      panel.classList.add("active");
    }
    

    function closePanel() {
      location.reload(); // Refresh page
    }
    